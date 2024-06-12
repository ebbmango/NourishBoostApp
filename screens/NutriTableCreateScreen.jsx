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

  // Creating stateful variables to control the visibility of the alerts and dialogs.
  const [showMeasureAlert, setShowMeasureAlert] = useState(false);
  const [showNutrientsAlert, setShowNutrientsAlert] = useState(false);
  const [showKcalsDialog, setShowKcalsDialog] = useState(false);
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
          onChangeNumber={(numberInput) => setBaseMeasure(numberInput.number)}
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
            },
            {
              title: "Carbohydrates",
              value: carbs,
            },
            {
              title: "Fats",
              value: fats,
            },
            {
              title: "Protein",
              value: protein,
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
            setNutrient={setKcals}
          />
          {/* Carbohydrates input */}
          <NutrientsInputField
            title={"Carbohydrates"}
            initialNumber={carbs}
            setNutrient={setCarbs}
          />
          {/* Fats input */}
          <NutrientsInputField
            title={"Fats"}
            initialNumber={fats}
            setNutrient={setFats}
          />
          {/* Protein input */}
          <NutrientsInputField
            title={"Protein"}
            initialNumber={protein}
            setNutrient={setProtein}
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
              let issuesUp = false;
              let issuesDown = false;

              if (baseMeasure <= 0) {
                scrollViewRef.current.scrollTo({ y: 0, animated: true });
                setShowMeasureAlert(true);
                issuesUp = true;
              }

              if ([kcals, carbs, fats, protein].some((macro) => macro < 0)) {
                setShowNutrientsAlert(true);
                issuesDown = true;
              }

              const nutrientsValidity = validateNutrients({
                kcals,
                carbs,
                fats,
                protein,
              });

              setShowKcalsDialog(alertKcals && !nutrientsValidity);

              if (
                !issuesUp &&
                !issuesDown &&
                (!alertKcals || nutrientsValidity)
              ) {
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
