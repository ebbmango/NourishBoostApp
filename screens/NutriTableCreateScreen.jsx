// External imports
import { useRef, useState } from "react";
import { useSQLiteContext } from "expo-sqlite/next";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Button,
  Colors,
  GridView,
  NumberInput,
  Picker,
  Text,
  View,
} from "react-native-ui-lib";

// Icons
import GaugeIcon from "../components/icons/GaugeIcon";
import RulerVerticalIcon from "../components/icons/RulerVerticalIcon";
import EditIcon from "../components/icons/EditIcon";

// Components
import AlertDialog from "../components/AlertDialog";
import NutrientsDialog from "../components/NutrientsDialog";

// Queries
import getNutritionalTables from "../queries/getNutritionalTables";

// Functions
import validateNutrients from "../functions/validateNutrients";
import validateNumericField from "../functions/validateNumericField";
import createNutritionalTable from "../queries/createNutritionalTable";

export default function FoodCreateScreen() {
  // Controllers & misc.
  const navigator = useNavigation();
  const database = useSQLiteContext();
  const screenWidth = Dimensions.get("window").width;
  const scrollViewRef = useRef(null);

  // Data (available units from which to choose)

  const route = useRoute();
  const { foodId, foodName } = route.params;

  // Retrieving all the available units on the database
  const unitObjects = database.getAllSync("SELECT * FROM units;");

  // Making an array of only their names.
  const unitNames = unitObjects.map((unitObject) => unitObject.unit);

  // Retrieving all the nutritional tables already present for the relevant food item.
  const nutritionalTables = getNutritionalTables({ database, foodId });

  const alreadyUsedUnits = nutritionalTables.map((table) => table.unit);

  const availableUnits = unitNames.filter(
    (unit) => !alreadyUsedUnits.includes(unit)
  );

  // Stateful variables: data, validation status & controllers.
  const [unit, setUnit] = useState(availableUnits[0]);

  const [baseMeasure, setBaseMeasure] = useState(0);
  const [measureValidity, setMeasureValidity] = useState(false);

  const [calories, setCalories] = useState(0);
  const [caloriesValidity, setCaloriesValidity] = useState(true);

  const [carbs, setCarbs] = useState(0);
  const [carbsValidity, setCarbsValidity] = useState(true);

  const [fats, setFats] = useState(0);
  const [fatsValidity, setFatsValidity] = useState(true);

  const [protein, setProtein] = useState(0);
  const [proteinValidity, setProteinValidity] = useState(true);

  const [showMeasureAlert, setShowMeasureAlert] = useState(false);
  const [showNutrientsAlert, setShowNutrientsAlert] = useState(false);
  const [showCaloriesDialog, setShowCaloriesDialog] = useState(false);

  // Activates once the submit button is pressed.
  const [startValidating, setStartValidating] = useState(false);

  // Deactivates once the "proceed anyway" button is pressed.
  const [alertCalories, setAlertCalories] = useState(true);

  return (
    <>
      {/* Total calories confirmation dialogue */}
      <NutrientsDialog
        visibility={showCaloriesDialog}
        setVisibility={setShowCaloriesDialog}
        expectedCalories={carbs * 4 + protein * 4 + fats * 9}
        informedCalories={calories}
        setAlertCalories={setAlertCalories}
      />
      {/* Total calories validity alert */}
      <AlertDialog
        alertContent={"Nutrients and calories cannot be negative!"}
        visibility={showNutrientsAlert}
        setVisibility={setShowNutrientsAlert}
      />
      {/* Base measure validity alert */}
      <AlertDialog
        alertContent={
          baseMeasure === 0
            ? "The base measure cannot be zero!"
            : "The base measure cannot be negative!"
        }
        visibility={showMeasureAlert}
        setVisibility={setShowMeasureAlert}
      />
      <ScrollView ref={scrollViewRef}>
        <Text
          text30
          style={{
            marginLeft: 16,
            marginVertical: 20,
            color: Colors.black,
          }}
        >
          {foodName}
        </Text>
        {/* Field that changes the amount of food */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
            marginLeft: 16,
          }}
        >
          <View width={24} height={24} style={{ marginTop: 12 }}>
            <GaugeIcon />
          </View>
          <NumberInput
            initialNumber={baseMeasure}
            onChangeNumber={(numberInput) => {
              const number = numberInput.number;
              setBaseMeasure(number);
              const validity = number > 0;
              setMeasureValidity(validity);
            }}
            containerStyle={{
              width: screenWidth - 64,
              height: 36,
              backgroundColor: Colors.grey60,
              borderRadius: 5,
              borderWidth: 1,
              borderColor:
                startValidating && !measureValidity
                  ? Colors.green30
                  : Colors.grey60,
              paddingHorizontal: 10,
              alignItems: "center",
            }}
          />
        </View>
        {/* Field that changes the currently selected measurement unit */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
            marginTop: 12,
            marginLeft: 16,
          }}
        >
          <View width={24} height={24} style={{ marginBottom: 2 }}>
            <RulerVerticalIcon />
          </View>
          <Picker
            value={unit}
            onChange={(element) => {
              setUnit(element);
            }}
            style={{
              width: screenWidth - 64,
              height: 36,
              backgroundColor: Colors.grey60,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
          >
            {availableUnits.map((unit) => (
              <Picker.Item key={unit} value={unit} label={unit} />
            ))}
          </Picker>
        </View>
        {/* Macronutrients grid */}
        <GridView
          numColumns={2}
          items={[
            {
              title: "Calories",
              value: calories,
              macro: false,
            },
            {
              title: "Carbohydrates",
              value: carbs,
              macro: true,
            },
            {
              title: "Fats",
              value: fats,
              macro: true,
            },
            {
              title: "Protein",
              value: protein,
              macro: true,
            },
          ]}
          renderCustomItem={({ title, value, macro }) => {
            return (
              <View
                key={title}
                style={{
                  width: screenWidth / 2 - 15, // Adjust the width for padding/margin
                  padding: 10,
                  justifyContent: "center",
                  backgroundColor: Colors.green30,
                  borderRadius: 5,
                  marginLeft: 10,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <Text text70>{title}</Text>
                <Text text70BL>
                  {value}
                  {macro && "g"}
                </Text>
              </View>
            );
          }}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            gap: 10,
          }}
        >
          {/* Calories input */}
          <View style={{ gap: 5 }}>
            <Text text70>Calories:</Text>
            <NumberInput
              initialNumber={calories}
              onChangeNumber={(numberInput) => {
                const number = numberInput.number;
                const validity = validateNumericField(number);
                setCalories(number);
                setCaloriesValidity(validity);
              }}
              containerStyle={{
                width: screenWidth - 20,
                height: 36,
                backgroundColor: Colors.grey50,
                borderRadius: 5,
                paddingHorizontal: 10,
                alignItems: "center",
                borderWidth: 1,
                borderColor:
                  startValidating && !caloriesValidity
                    ? Colors.green30
                    : Colors.grey60,
              }}
            />
          </View>
          {/* Carbohydrates input */}
          <View style={{ gap: 5 }}>
            <Text text70>Carbohydrates:</Text>
            <NumberInput
              initialNumber={carbs}
              onChangeNumber={(numberInput) => {
                const number = numberInput.number;
                const validity = validateNumericField(number);
                setCarbs(number);
                setCarbsValidity(validity);
              }}
              containerStyle={{
                width: screenWidth - 20,
                height: 36,
                backgroundColor: Colors.grey50,
                borderRadius: 5,
                paddingHorizontal: 10,
                alignItems: "center",
                borderWidth: 1,
                borderColor:
                  startValidating && !carbsValidity
                    ? Colors.green30
                    : Colors.grey60,
              }}
            />
          </View>
          {/* Fats input */}
          <View style={{ gap: 5 }}>
            <Text text70>Fats:</Text>
            <NumberInput
              initialNumber={fats}
              onChangeNumber={(numberInput) => {
                const number = numberInput.number;
                const validity = validateNumericField(number);
                setFats(number);
                setFatsValidity(validity);
              }}
              containerStyle={{
                width: screenWidth - 20,
                height: 36,
                backgroundColor: Colors.grey50,
                borderRadius: 5,
                paddingHorizontal: 10,
                alignItems: "center",
                borderWidth: 1,
                borderColor:
                  startValidating && !fatsValidity
                    ? Colors.green30
                    : Colors.grey60,
              }}
            />
          </View>
          {/* Protein input */}
          <View style={{ gap: 5 }}>
            <Text text70>Protein:</Text>
            <NumberInput
              initialNumber={protein}
              onChangeNumber={(numberInput) => {
                const number = numberInput.number;
                const validity = validateNumericField(number);
                setProtein(number);
                setProteinValidity(validity);
              }}
              containerStyle={{
                width: screenWidth - 20,
                height: 36,
                backgroundColor: Colors.grey50,
                borderRadius: 5,
                paddingHorizontal: 10,
                alignItems: "center",
                borderWidth: 1,
                borderColor:
                  startValidating && !proteinValidity
                    ? Colors.green30
                    : Colors.grey60,
              }}
            />
          </View>
          {/* Confirm button */}
          <Button
            label="Add nutritional table"
            iconSource={() => {
              return (
                <View width={20} height={20} style={{ marginRight: 6 }}>
                  <EditIcon color={Colors.white} />
                </View>
              );
            }}
            style={{
              width: screenWidth / 2,
              padding: 6,
              borderRadius: 10,
              backgroundColor: Colors.green30,
              marginTop: 10,
              marginBottom: 20,
            }}
            onPress={() => {
              setStartValidating(true);

              // First, show the data type errors:
              // Scroll up if the issues are in the first fields.
              if (!measureValidity) {
                scrollViewRef.current.scrollTo({ y: 0, animated: true });
                // Show each of the issues in the first fields:
                setShowMeasureAlert(true);
              }

              // Show the issues in the last fields.
              setShowNutrientsAlert(
                !caloriesValidity ||
                  !carbsValidity ||
                  !fatsValidity ||
                  !proteinValidity
              );

              // Second, show the unwanted but manageable errors:
              const nutrientsValidity = validateNutrients({
                calories,
                carbs,
                fats,
                protein,
              });

              // Only show the dialog if...
              setShowCaloriesDialog(
                // The user has not dismissed it previously.
                alertCalories &&
                  // There is something amiss with the nutrients' count.
                  !nutrientsValidity
              );

              // If the user has dismissed the alert or if there is nothing amiss with the nutrients' count
              if (!alertCalories || nutrientsValidity) {
                // Run the query to insert the data into the database and redirect to the newly created food page
                const unitId = unitObjects.filter((unitObject) => {
                  return unitObject.unit === unit;
                })[0].id;

                createNutritionalTable(database, {
                  foodId,
                  unitId,
                  baseMeasure,
                  calories,
                  protein,
                  carbs,
                  fats,
                });

                navigator.navigate("List");
              }
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}
