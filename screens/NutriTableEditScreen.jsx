// External imports
import { useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useSQLiteContext } from "expo-sqlite/next";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Colors, Text, View } from "react-native-ui-lib";
import { useNavigation, useRoute } from "@react-navigation/native";

// Icons
import EditIcon from "../components/icons/EditIcon";

// Components
import AlertDialog from "../components/AlertDialog";
import NutrientsDialog from "../components/NutrientsDialog";
import UnitPicker from "../components/FoodDetails/UnitPicker";
import QuantityField from "../components/FoodDetails/QuantityField";
import NutrientsGrid from "../components/FoodDetails/NutrientsGrid";
import NutrientsInputField from "../components/NutrientsInputField";

// Queries
import getAvailableUnits from "../queries/getAvailableUnits";
import createNutritionalTable from "../queries/createNutritionalTable";

// Functions
import validateNutrients from "../functions/validateNutrients";

// Stylesheets
import styles from "../styles/styles";
import RulerVerticalIcon from "../components/icons/RulerVerticalIcon";
import updateNutritionalTable from "../queries/updateNutritionalTable";

export default function NutriTableEditScreen() {
  // Instantiating the navigator.
  const navigator = useNavigation();

  // Connecting to the database.
  const database = useSQLiteContext();

  // Instantiating the queries' client.
  const queryClient = useQueryClient();

  // Creating a reference to the scrollView (to be able to use scroll functions).
  const scrollViewRef = useRef(null);

  // Extracting the food's ID and name from the parameters.
  const {
    foodId,
    foodName,
    nutritionalTable: {
      tableId,
      unit,
      baseMeasure: originalBaseMeasure,
      kcals: originalKcals,
      carbs: originalCarbs,
      fats: originalFats,
      protein: originalProtein,
    },
  } = useRoute().params;

  console.log(foodId, foodName);

  // Retrieving the available measurement units from the database.
  const availableUnits = getAvailableUnits(database, { foodId });

  // Creating stateful variables to hold all data that concerns the food.
  const [baseMeasure, setBaseMeasure] = useState(originalBaseMeasure);
  const [kcals, setKcals] = useState(originalKcals);
  const [carbs, setCarbs] = useState(originalCarbs);
  const [fats, setFats] = useState(originalFats);
  const [protein, setProtein] = useState(originalProtein);

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
          center
          style={{
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
        <View style={styles.foodDetailsScreen.fieldViewStyle}>
          <View>
            <RulerVerticalIcon width={24} height={24} />
          </View>
          <View style={styles.foodDetailsScreen.inputFieldStyle}>
            <Text>{unit.symbol}</Text>
          </View>
        </View>
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
            label="Edit nutritional table"
            iconSource={() => {
              return (
                <View width={20} height={20} style={{ marginRight: 6 }}>
                  <EditIcon color={Colors.white} />
                </View>
              );
            }}
            style={styles.foodDetailsScreen.addButton}
            onPress={() => {
              // Validates data, shows relevant alerts and dialogues & creates a new nutritional table.
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

              // If there are no issues
              if (
                !issuesUp &&
                !issuesDown &&
                (!alertKcals || nutrientsValidity)
              ) {
                // If anything is different...
                if (
                  baseMeasure !== originalBaseMeasure ||
                  kcals !== originalKcals ||
                  carbs !== originalCarbs ||
                  fats !== originalFats ||
                  protein !== originalProtein
                ) {
                  updateNutritionalTable(database, {
                    tableId,
                    baseMeasure,
                    kcals,
                    carbs,
                    fats,
                    protein,
                  });
                }

                // Pops this page from the stack navigator and returning to the previous one.
                navigator.pop();
              }
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}
