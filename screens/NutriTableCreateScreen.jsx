// External imports
import { useRef, useState } from "react";
import { useSQLiteContext } from "expo-sqlite/next";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Colors, Text, View } from "react-native-ui-lib";

// Icons
import EditIcon from "../components/icons/EditIcon";

// Components
import AlertDialog from "../components/AlertDialog";
import NutrientsDialog from "../components/NutrientsDialog";
import QuantityField from "../components/FoodDetails/QuantityField";
import UnitPicker from "../components/FoodDetails/UnitPicker";
import NutrientsGrid from "../components/FoodDetails/NutrientsGrid";
import NutrientsInputField from "../components/NutrientsInputField";

// Queries
import getAvailableUnits from "../queries/getAvailableUnits";
import createNutritionalTable from "../queries/createNutritionalTable";

// Functions
import validateNutrients from "../functions/validateNutrients";
import styles from "../styles";

export default function FoodCreateScreen() {
  // Instantiating the navigator.
  const navigator = useNavigation();

  // Connecting to the database.
  const database = useSQLiteContext();

  // Creating a reference to the scrollView (to be able to use scroll functions).
  const scrollViewRef = useRef(null);

  // Extracting the food's ID and name from the parameters.
  const { foodId, foodName } = useRoute().params;

  const availableUnits = getAvailableUnits(database, { foodId });

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
        <QuantityField
          initialNumber={baseMeasure}
          onChangeNumber={(numberInput) => {
            const number = numberInput.number;
            setBaseMeasure(number);
            const validity = number > 0;
            setMeasureValidity(validity);
          }}
        />

        {/* Field that changes the currently selected measurement unit */}
        <UnitPicker
          value={unit.id}
          options={availableUnits}
          onChange={(value) => {
            // Retrieves the measurement unit object whose symbol equals the one chosen by the user.
            const userChoice = availableUnits.find((unit) => unit.id === value);
            // Updates the currently selected measurement unit.
            setUnit(userChoice);
          }}
        />
        {/* Macronutrients grid */}
        <NutrientsGrid
          items={[
            {
              title: "Calories",
              value: kcals,
              trailing: "",
              color: Colors.green40,
            },
            {
              title: "Carbohydrates",
              value: carbs,
              trailing: "g",
              color: Colors.green40,
            },
            {
              title: "Fats",
              value: fats,
              trailing: "g",
              color: Colors.green40,
            },
            {
              title: "Protein",
              value: protein,
              trailing: "g",
              color: Colors.green40,
            },
          ]}
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
          <NutrientsInputField
            title={"Calories"}
            initialNumber={kcals}
            setters={{ nutrient: setKcals, validity: setKcalsValidity }}
          />
          {/* Carbohydrates input */}
          <NutrientsInputField
            title={"Carbohydrates"}
            initialNumber={carbs}
            setters={{ nutrient: setCarbs, validity: setCarbsValidity }}
          />
          {/* Fats input */}
          <NutrientsInputField
            title={"Fats"}
            initialNumber={fats}
            setters={{ nutrient: setFats, validity: setFatsValidity }}
          />
          {/* Protein input */}
          <NutrientsInputField
            title={"Protein"}
            initialNumber={protein}
            setters={{ nutrient: setProtein, validity: setProteinValidity }}
          />

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
            style={styles.foodDetailsScreen.addButton}
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
              if (measureValidity && (!alertKcals || nutrientsValidity)) {
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
