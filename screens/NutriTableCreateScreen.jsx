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
import getAllUnits from "../queries/getAllUnits";
import getDifference from "../functions/getDifference";

export default function FoodCreateScreen() {
  // Extracting the device's dimensions
  const screenWidth = Dimensions.get("window").width;

  // Instantiating the navigator.
  const navigator = useNavigation();

  // Connecting to the database.
  const database = useSQLiteContext();

  // Creating a reference to the scrollView (to be able to use scroll functions).
  const scrollViewRef = useRef(null);

  // Extracting the food's ID and name from the parameters.
  const { foodId, foodName } = useRoute().params;

  // Retrieving all the nutritional tables already present for the relevant food item.
  const nutritionalTables = getNutritionalTables(database, { foodId });

  // Retrieving all measurement units.
  const measurementUnits = getAllUnits(database);

  // Retrieving all measurement units used by the food object's nutritional tables.
  const alreadyUsedUnits = nutritionalTables.map((table) => table.unit);

  // Figuring out what measurement units have not been used by the object's nutritional tables yet.
  const availableUnits = getDifference(measurementUnits, alreadyUsedUnits);

  // Creating stateful variables to hold all data that concerns the food.
  const [unit, setUnit] = useState(availableUnits[0]);
  const [baseMeasure, setBaseMeasure] = useState(0);
  const [kcals, setKcals] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);
  const [protein, setProtein] = useState(0);

  // Creating stateful variables to validate all of the above data.
  const [measureValidity, setMeasureValidity] = useState(false);
  const [kcalsValidity, setKcalsValidity] = useState(true);
  const [carbsValidity, setCarbsValidity] = useState(true);
  const [fatsValidity, setFatsValidity] = useState(true);
  const [proteinValidity, setProteinValidity] = useState(true);

  // Creating stateful variables to control the visibility of the alerts and dialogs.
  const [showMeasureAlert, setShowMeasureAlert] = useState(false);
  const [showNutrientsAlert, setShowNutrientsAlert] = useState(false);
  const [showKcalsDialog, setShowKcalsDialog] = useState(false);
  const [startValidating, setStartValidating] = useState(false); // (Activates once the submit button is pressed.)
  const [alertKcals, setAlertKcals] = useState(true); // (Deactivates once the "proceed anyway" button is pressed.)

  return (
    <>
      {/* Total kcals confirmation dialogue */}
      <NutrientsDialog
        visibility={showKcalsDialog}
        setVisibility={setShowKcalsDialog}
        expectedKcals={carbs * 4 + protein * 4 + fats * 9}
        informedKcals={kcals}
        setAlertKcals={setAlertKcals}
      />
      {/* Total kcals validity alert */}
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
            value={unit.symbol}
            onChange={(value) => {
              // Retrieves the measurement unit object whose symbol equals the one chosen by the user.
              const userChoice = availableUnits.filter(
                (unit) => unit.symbol === value
              )[0];
              // Updates the currently selected measurement unit.
              setUnit(userChoice);
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
              <Picker.Item
                key={unit.id}
                value={unit.symbol}
                label={unit.symbol}
              />
            ))}
          </Picker>
        </View>
        {/* Macronutrients grid */}
        <GridView
          numColumns={2}
          items={[
            {
              title: "Calories",
              value: kcals,
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
          {/* Kcals input */}
          <View style={{ gap: 5 }}>
            <Text text70>Calories:</Text>
            <NumberInput
              initialNumber={kcals}
              onChangeNumber={(numberInput) => {
                const number = numberInput.number;
                const validity = validateNumericField(number);
                setKcals(number);
                setKcalsValidity(validity);
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
                  startValidating && !kcalsValidity
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
                !kcalsValidity ||
                  !carbsValidity ||
                  !fatsValidity ||
                  !proteinValidity
              );

              // Second, show the unwanted but manageable errors:
              const nutrientsValidity = validateNutrients({
                kcals,
                carbs,
                fats,
                protein,
              });

              // Only show the dialog if...
              setShowKcalsDialog(
                // The user has not dismissed it previously.
                alertKcals &&
                  // There is something amiss with the nutrients' count.
                  !nutrientsValidity
              );

              // If the user has dismissed the alert or if there is nothing amiss with the nutrients' count
              if (!alertKcals || nutrientsValidity) {
                // Run the query to insert the data into the database and redirect to the newly created food page

                createNutritionalTable(database, {
                  foodId,
                  unitId: unit.id,
                  baseMeasure,
                  kcals,
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
