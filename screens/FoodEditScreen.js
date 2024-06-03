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

// Functions
import validateNutrients from "../functions/validateNutrients";
import validateString from "../functions/validateString";
import validateNumericField from "../functions/validateNumericField";

export default function FoodCreateScreen() {
  // Controllers & misc.
  const navigator = useNavigation();
  const database = useSQLiteContext();
  const screenWidth = Dimensions.get("window").width;
  const scrollViewRef = useRef(null);

  // Parametersescl
  const route = useRoute();
  const { nutritionalTable } = route.params;

  const initialValues = {
    name: nutritionalTable.foodName,
    baseMeasure: nutritionalTable.baseMeasure,
    calories: nutritionalTable.calories,
    carbs: nutritionalTable.carbs,
    fats: nutritionalTable.fats,
    protein: nutritionalTable.protein,
  };

  // Stateful variables: data, validation status & controllers.
  const [foodName, setFoodName] = useState(initialValues.name);
  const [nameValidity, setNameValidity] = useState(true);
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isNameUnique, setIsNameUnique] = useState(true);

  const [baseMeasure, setBaseMeasure] = useState(initialValues.baseMeasure);
  const [measureValidity, setMeasureValidity] = useState(true);

  const unit = nutritionalTable.unit;

  const [calories, setCalories] = useState(initialValues.calories);
  const [caloriesValidity, setCaloriesValidity] = useState(true);

  const [carbs, setCarbs] = useState(initialValues.carbs);
  const [carbsValidity, setCarbsValidity] = useState(true);

  const [fats, setFats] = useState(initialValues.fats);
  const [fatsValidity, setFatsValidity] = useState(true);

  const [protein, setProtein] = useState(initialValues.protein);
  const [proteinValidity, setProteinValidity] = useState(true);

  const [showNameAlert, setShowNameAlert] = useState(false);
  const [showMeasureAlert, setShowMeasureAlert] = useState(false);
  const [showNutrientsAlert, setShowNutrientsAlert] = useState(false);
  const [showCaloriesDialog, setShowCaloriesDialog] = useState(false);

  // Activates once the submit button is pressed.
  const [startValidating, setStartValidating] = useState(false);

  // Deactivates once the "proceed anyway" button is pressed.
  const [alertCalories, setAlertCalories] = useState(true);

  // Data
  const allFoodNames = database
    .getAllSync("SELECT name FROM foods;")
    .map((foodObject) => foodObject.name)
    .filter((name) => name !== initialValues.name);

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
        alertContent={`The food's name must be unique!\nThis name already belongs to a food item.`}
        visibility={showNameAlert}
        setVisibility={setShowNameAlert}
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
          {foodName.length === 0 ? initialValues.name : foodName}
        </Text>
        {/* Field that changes the food's name */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
            marginLeft: 16,
          }}
        >
          <View width={24} height={24}>
            <PencilIcon />
          </View>
          <TextField
            placeholder={initialValues.name}
            onChangeText={(text) => {
              // Changing the display name to accord to the input name.
              setFoodName(text);
              // Checking whether the name is empty or not.
              const isEmpty = !validateString(text);
              setIsNameEmpty(isEmpty);
              // Checking whether the name is unique or not.
              const isUnique = !allFoodNames.includes(text);
              // Checking overall validity.
              setNameValidity(isUnique); // (Empty names default to the original value.)
            }}
            containerStyle={{
              width: screenWidth - 64,
              height: 36,
              backgroundColor: Colors.grey60,
              borderRadius: 5,
              borderWidth: 1,
              borderColor:
                startValidating && !nameValidity
                  ? Colors.green30
                  : Colors.grey60,
              paddingHorizontal: 10,
              justifyContent: "center",
            }}
          />
        </View>
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
              marginTop: 12,
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
          <View width={24} height={24}>
            <RulerVerticalIcon />
          </View>
          <View
            centerV
            style={{
              width: screenWidth - 64,
              height: 36,
              backgroundColor: Colors.grey60,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
          >
            <Text>{unit}</Text>
          </View>
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
                  // If any changes have been made:
                  if (
                    initialValues.name !== foodName ||
                    initialValues.baseMeasure !== baseMeasure ||
                    initialValues.calories !== calories ||
                    initialValues.carbs !== carbs ||
                    initialValues.fats !== fats ||
                    initialValues.protein !== protein
                  ) {
                    // If it was to the foodName:
                    if (foodName !== initialValues.name) {
                      const updateNameStatement = `UPDATE foods SET name = '${foodName}' WHERE name = '${initialValues.name}';`;
                      database.runSync(updateNameStatement);
                    }
                    // If it was to anything else:
                    const updateNutrientsStatement = `
                    UPDATE food_nutri_table SET
                    base_measure = ${baseMeasure},
                    calories = ${calories},
                    carbs = ${carbs},
                    fats = ${fats},
                    protein = ${protein}
                    WHERE id = ${nutritionalTable.tableId};
                    `;
                    database.runSync(updateNutrientsStatement);
                  }

                  // Notwithstanding what happened:
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