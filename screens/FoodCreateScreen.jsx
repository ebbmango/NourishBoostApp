// External imports
import { useRef, useState } from "react";
import { useSQLiteContext } from "expo-sqlite/next";
import { Dimensions, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Colors,
  GridView,
  NumberInput,
  Picker,
  Text,
  TextField,
  View,
} from "react-native-ui-lib";

// Icons
import GaugeIcon from "../components/icons/GaugeIcon";
import RulerVerticalIcon from "../components/icons/RulerVerticalIcon";
import EditIcon from "../components/icons/EditIcon";
import PencilIcon from "../components/icons/PencilIcon";

// Components
import AlertDialog from "../components/AlertDialog";
import NutrientsDialog from "../components/NutrientsDialog";
import MacrosGrid from "../components/MacrosGrid";

// Functions
import validateNutrients from "../functions/validateNutrients";
import validateString from "../functions/validateString";
import validateNumericField from "../functions/validateNumericField";
import createNutritionalTable from "../queries/createNutritionalTable";

// Queries
import createFood from "../queries/createFood";
import getUnits from "../queries/getUnits";
import getFoods from "../queries/getFoods";
import tweakStyles from "../functions/tweakStyles";

// Initializing variables
const screenWidth = Dimensions.get("window").width;

export default function FoodCreateScreen() {
  // Controllers & misc.
  const navigator = useNavigation();
  const database = useSQLiteContext();
  const scrollViewRef = useRef(null);

  // Data
  const measurementUnits = getUnits(database);
  const allFoodNames = getFoods(database).map((food) => food.name);

  // Stateful variables: data, validation status & controllers.
  const [foodName, setFoodName] = useState("");
  const [nameValidity, setNameValidity] = useState(false);
  const [isNameEmpty, setIsNameEmpty] = useState(true);
  const [isNameUnique, setIsNameUnique] = useState(true);

  const [unit, setUnit] = useState(measurementUnits[0].symbol);

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

  const [showNameAlert, setShowNameAlert] = useState(false);
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
      {/* Food validity alert */}
      <AlertDialog
        alertContent={
          isNameEmpty
            ? "The food's name cannot be empty!"
            : `The food's name must be unique!\nThis name already belongs to a food item.`
        }
        visibility={showNameAlert}
        setVisibility={setShowNameAlert}
      />
      <ScrollView ref={scrollViewRef}>
        <Text
          text30
          style={{
            marginLeft: 16,
            marginTop: 20,
            color: foodName.length === 0 ? Colors.grey40 : Colors.black,
          }}
        >
          {foodName.length === 0 ? "New food" : foodName}
        </Text>
        {/* Field that changes the food's name */}
        <View style={styles.iconViews}>
          <View width={24} height={24}>
            <PencilIcon />
          </View>
          <TextField
            placeholder={"Enter the food name here."}
            onChangeText={(text) => {
              // Changing the display name to accord to the input name.
              setFoodName(text);
              // Checking whether the name is empty or not.
              const isEmpty = !validateString(text);
              setIsNameEmpty(isEmpty);
              // Checking whether the name is unique or not.
              const isUnique = !allFoodNames.includes(text);
              setIsNameUnique(isUnique);
              // Checking overall validity.
              setNameValidity(isUnique && !isEmpty);
            }}
            containerStyle={tweakStyles(styles.iconFields, {
              borderColor:
                startValidating && !nameValidity
                  ? Colors.green30
                  : Colors.grey60,
            })}
          />
        </View>
        {/* Field that changes the amount of food */}
        <View style={styles.iconViews}>
          <View width={24} height={24}>
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
            containerStyle={tweakStyles(styles.iconFields, {
              borderColor:
                startValidating && !measureValidity
                  ? Colors.green30
                  : Colors.grey60,
            })}
          />
        </View>
        {/* Field that changes the currently selected measurement unit */}
        <View style={styles.iconViews}>
          <View width={24} height={24} style={{ marginBottom: 2 }}>
            <RulerVerticalIcon />
          </View>
          <Picker
            value={unit}
            onChange={(element) => {
              setUnit(element);
            }}
            style={styles.iconFields}
          >
            {measurementUnits.map((unitObject) => (
              <Picker.Item
                key={unitObject.id}
                value={unitObject.symbol}
                label={unitObject.symbol}
              />
            ))}
          </Picker>
        </View>
        {/* Macronutrients grid */}
        <MacrosGrid
          calories={calories}
          carbs={carbs}
          fats={fats}
          protein={protein}
        />
        {/* Nutrients' fields list */}
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
              containerStyle={styles.nutrientFields}
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
              containerStyle={styles.nutrientFields}
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
              containerStyle={styles.nutrientFields}
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
              containerStyle={styles.nutrientFields}
            />
          </View>
          {/* Confirm button */}
          <Button
            label="Register food item"
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

              const issuesUp = !nameValidity || !measureValidity;
              const issuesDown =
                !caloriesValidity ||
                !carbsValidity ||
                !fatsValidity ||
                !proteinValidity;
              const majorIssues = issuesUp || issuesDown;

              // First, show the data type errors:
              if (majorIssues) {
                // Scroll up if the issues are in the first fields.
                if (issuesUp) {
                  scrollViewRef.current.scrollTo({ y: 0, animated: true });
                  // Show each of the issues in the first fields:
                  setShowNameAlert(!nameValidity);
                  setShowMeasureAlert(!measureValidity);
                }
                // Show the issues in the last fields.
                setShowNutrientsAlert(issuesDown);
              } else {
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
                  const foodId = createFood(database, {
                    foodName,
                  }).lastInsertRowId;

                  const unitId = measurementUnits.filter((unitObject) => {
                    return unitObject.symbol === unit;
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
              }
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}

// Stylesheet
const styles = StyleSheet.create({
  iconViews: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 12,
    marginLeft: 16,
  },
  iconFields: {
    flexDirection: "column",
    width: screenWidth - 64,
    height: 36,
    backgroundColor: Colors.grey60,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.grey60,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  nutrientFields: {
    width: screenWidth - 20,
    height: 36,
    backgroundColor: Colors.grey50,
    borderRadius: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.grey50,
  },
});
