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
import updateNutritionalTable from "../queries/updateNutritionalTable";
import updateFoodName from "../queries/updateFoodName";
import getFoods from "../queries/getFoods";

export default function FoodCreateScreen() {
  // Extracting the device's dimensions
  const screenWidth = Dimensions.get("window").width;

  // Instantiating the navigator.
  const navigator = useNavigation();

  // Connecting to the database.
  const database = useSQLiteContext();

  // Creating a reference to the scrollView (to be able to use scroll functions).
  const scrollViewRef = useRef(null);

  // Extracting the food's ID, name and relevant nutritional table from the parameters.
  const {
    foodId,
    foodName: originalFoodName,
    nutritionalTable,
  } = useRoute().params;

  // Destructuring the original values from the nutritional table.
  const {
    baseMeasure: originalMeasure,
    kcals: originalKcals,
    carbs: originalCarbs,
    fats: originalFats,
    protein: originalProtein,
  } = nutritionalTable;

  // Creating stateful variables to hold all data that concerns the food.
  const [newFoodName, setNewFoodName] = useState(originalFoodName);
  const [baseMeasure, setBaseMeasure] = useState(originalMeasure);
  const unit = nutritionalTable.unit; // Not stateful, but nonetheless concerns the food.
  const [kcals, setKcals] = useState(originalKcals);
  const [carbs, setCarbs] = useState(originalCarbs);
  const [fats, setFats] = useState(originalFats);
  const [protein, setProtein] = useState(originalProtein);

  // Creating stateful variables to validate all of the above data.
  const [nameValidity, setNameValidity] = useState(true);
  const [measureValidity, setMeasureValidity] = useState(true);
  const [caloriesValidity, setKcalsValidity] = useState(true);
  const [carbsValidity, setCarbsValidity] = useState(true);
  const [fatsValidity, setFatsValidity] = useState(true);
  const [proteinValidity, setProteinValidity] = useState(true);

  // Creating stateful variables to control the visibility of the alerts and dialogs.
  const [showNameAlert, setShowNameAlert] = useState(false);
  const [showMeasureAlert, setShowMeasureAlert] = useState(false);
  const [showNutrientsAlert, setShowNutrientsAlert] = useState(false);
  const [showKcalsDialog, setShowKcalsDialog] = useState(false);
  const [startValidating, setStartValidating] = useState(false); // (Activates once the submit button is pressed.)
  const [alertKcals, setAlertKcals] = useState(true); // (Deactivates once the "proceed anyway" button is pressed.)

  // Retrieving the names of all the foods currently registered in the database (for uniqueness check).
  const allFoodNames = getFoods(database)
    .map((food) => food.name)
    .filter((name) => name !== originalFoodName); // Excluding, of course, the currently selected food.

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
          {newFoodName.length === 0 ? originalFoodName : newFoodName}
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
            placeholder={originalFoodName}
            onChangeText={(text) => {
              // Checking whether the name is empty or not.
              const isEmpty = !validateString(text);
              // If it is, revert the name back to its original value; if it is not, change it to match the input field.
              setNewFoodName(isEmpty ? originalFoodName : text);
              // Checking whether the name is unique or not.
              const isUnique = !allFoodNames.includes(text);
              setNameValidity(isUnique);
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
            <Text>{unit.symbol}</Text>
          </View>
        </View>
        {/* Macronutrients grid */}
        <GridView
          numColumns={2}
          items={[
            {
              title: "Kcals",
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
            <Text text70>Kcals:</Text>
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
            label="Confirm edit"
            iconSource={() => {
              return (
                <View width={20} height={20} style={{ marginRight: 6 }}>
                  <EditIcon color={Colors.white} />
                </View>
              );
            }}
            style={{
              width: screenWidth / 2 - 15,
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
                  // If any changes have been made:
                  if (
                    originalFoodName !== newFoodName ||
                    originalMeasure !== baseMeasure ||
                    originalKcals !== kcals ||
                    originalCarbs !== carbs ||
                    originalFats !== fats ||
                    originalProtein !== protein
                  ) {
                    // If it was to the newFoodName:
                    if (newFoodName !== originalFoodName) {
                      updateFoodName(database, { foodId, newFoodName });
                    }
                    // If it was to anything else:
                    if (
                      baseMeasure !== originalMeasure ||
                      kcals !== originalKcals ||
                      carbs !== originalCarbs ||
                      fats !== originalFats ||
                      protein !== originalProtein
                    ) {
                      updateNutritionalTable(database, {
                        tableId: nutritionalTable.tableId,
                        baseMeasure,
                        kcals,
                        carbs,
                        fats,
                        protein,
                      });
                    }
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
