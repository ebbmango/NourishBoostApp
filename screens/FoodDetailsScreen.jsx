// External dependencies
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Colors, Text, TouchableOpacity, View } from "react-native-ui-lib";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addDatabaseChangeListener, useSQLiteContext } from "expo-sqlite";

// Components
import AlertDialogue from "../components/AlertDialogue";
import UnitPicker from "../components/FoodDetails/UnitPicker";
import QuantityField from "../components/FoodDetails/QuantityField";
import NutrientsGrid from "../components/FoodDetails/NutrientsGrid";
import ConfirmationDialogue from "../components/ConfirmationDialogue";
import FoodOptionButton from "../components/FoodDetails/FoodOptionButton";

// Queries
import getFoodById from "../queries/getFoodById";
import getUnitsByFood from "../queries/getUnitsByFood";
import deleteFood from "../queries/deleteFood";
import createFoodEntry from "../queries/createFoodEntry";
import getNutrientsByFood from "../queries/getNutrientsByFood";
import deleteNutrients from "../queries/deleteNutrients";
import getAllUnits from "../queries/getAllUnits";

// Functions
import fixDecimals from "../functions/fixDecimals";

// Stylesheets
import styles from "../styles/styles";

// Icons
import PencilIcon from "../components/icons/PencilIcon";
import UtensilsIcon from "../components/icons/UtensilsIcon";
import FilePlusIcon from "../components/icons/FilePlusIcon";
import FileWriteIcon from "../components/icons/FileWriteIcon";
import FileDeleteIcon from "../components/icons/FileDeleteIcon";

const screenWidth = Dimensions.get("window").width;

export default function FoodDetailsScreen() {
  // Instantiating the navigator.
  const navigator = useNavigation();

  // Connecting to the database.
  const database = useSQLiteContext();

  // Extracting the relevant data from the router's parameters.
  const { foodId, mealId, date } = useRoute().params;

  // Retrieving all units from the database.
  const allUnits = getAllUnits(database);

  // Getting the food's name from the database.
  const { data: foodName = "" } = useQuery(
    "foodName",
    () => getFoodById(database, { foodId }).name
  );

  // Getting the food's nutritional tables from the database.
  const {
    data: nutritionalTables,
    refetch: refetchTables,
    isSuccess: tablesLoaded,
  } = useQuery("nutritionalTables", () =>
    getNutrientsByFood(database, { foodId })
  );

  // Getting the food's measurement units from the database.
  const {
    data: measurementUnits,
    refetch: refetchUnits,
    isSuccess: unitsLoaded,
  } = useQuery("availableUnits", () => getUnitsByFood(database, { foodId }));

  // Resetting the quantity field back to the currently selected nutritional table's base measure.
  useEffect(() => {
    if (nutritionalTables) {
      setQuantity(nutritionalTables[tableIndex].baseMeasure);
    }
  }, [nutritionalTables]);

  // Function that calculates the amount of calories and macronutrients per portion of the selected food.
  const proportion = (number) => {
    return number === 0
      ? 0
      : (number / nutritionalTables[tableIndex].baseMeasure) * quantity;
  };

  // Setting up stateful variables to keep track of the currently selected nutritional table and amount of food.
  const [tableIndex, setTableIndex] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [unitId, setUnitId] = useState(null);

  // Setting up a stateful variable to hold the unit picker's key in order to manually re-render it at will.
  const [pickerKey, setPickerKey] = useState(Date.now());

  // Function that manually rerenders it.
  function rerenderPicker() {
    setPickerKey(Date.now());
  }

  // Refetching the tables and units every time a change happens in the nutritional tables' row in the database.
  useEffect(() => {
    const listener = addDatabaseChangeListener((change) => {
      if (change.tableName === "nutrients") {
        refetchTables();
        refetchUnits();
      }
    });

    return () => {
      listener.remove();
    };
  }, []);

  // Alerts
  const [showTablesAlert, setShowTablesAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  if (tablesLoaded && unitsLoaded) {
    return (
      <>
        <ConfirmationDialogue
          red
          visible={showDeleteAlert}
          setVisible={setShowDeleteAlert}
          content={{
            confirmText: "Delete",
            cancelText: "Cancel",
            alertContent: (
              <View text70L center gap={8}>
                <Text text70 center>
                  This action will permanently delete the food{" "}
                  <Text text70BL>{foodName}</Text> from the database.
                </Text>
                <Text red10 text70BL center>
                  This action cannot be undone.
                </Text>
              </View>
            ),
          }}
          onConfirm={() => {
            deleteFood(database, { foodId });
            navigator.pop();
          }}
        />
        <AlertDialogue
          visible={showTablesAlert}
          setVisible={setShowTablesAlert}
          content={{
            confirmText: "I understand.",
            alertContent: (
              <Text text70>
                "There exists already a nutritional table for each measurement
                unit."
              </Text>
            ),
          }}
        />
        <View style={styles.foodDetailsScreen.foodNameView}>
          <Text text30>{foodName}</Text>
          <TouchableOpacity style={{ position: "absolute", right: 16 }}>
            <PencilIcon width={24} height={24} color={Colors.grey10} />
          </TouchableOpacity>
        </View>

        {/* Field that changes the amount of food */}
        <QuantityField
          initialNumber={nutritionalTables[tableIndex].baseMeasure}
          onChangeNumber={(numberInput) => setQuantity(numberInput.number)}
        />
        {/* Field that changes the currently selected measurement unit */}
        <UnitPicker
          key={pickerKey}
          value={measurementUnits[tableIndex].id}
          options={measurementUnits}
          onChange={(change) => {
            // Finding the index of the new table.
            const newTableIndex = nutritionalTables.findIndex(
              (table) => table.unit.id === change
            );

            setUnitId(change);

            // Setting the index of the new table.
            setTableIndex(newTableIndex);

            rerenderPicker();
          }}
        />
        {/* Macronutrients grid */}
        <NutrientsGrid
          items={[
            {
              title: "Calories",
              value: fixDecimals(
                proportion(nutritionalTables[tableIndex]?.kcals)
              ),
            },
            {
              title: "Carbohydrates",
              value: fixDecimals(
                proportion(nutritionalTables[tableIndex].carbs)
              ),
            },
            {
              title: "Fats",
              value: fixDecimals(
                proportion(nutritionalTables[tableIndex].fats)
              ),
            },
            {
              title: "Protein",
              value: fixDecimals(
                proportion(nutritionalTables[tableIndex].protein)
              ),
            },
          ]}
        />
        <View style={styles.foodDetailsScreen.buttonsView}>
          {/* Add Nutritional Table */}
          <FoodOptionButton
            iconSource={() => (
              <FilePlusIcon
                color={Colors.white}
                width={28}
                height={28}
                style={{ marginLeft: 6 }}
              />
            )}
            onPress={() => {
              if (measurementUnits.length === allUnits.length) {
                setShowTablesAlert(true);
              } else {
                navigator.navigate("Add Nutritional Table", {
                  foodId,
                  foodName,
                });
              }
            }}
          />
          {/* Edit Food and/or Nutritional Table */}
          <FoodOptionButton
            iconSource={() => (
              <FileWriteIcon
                color={Colors.white}
                width={28}
                height={28}
                style={{ marginLeft: 6 }}
              />
            )}
            onPress={() => {
              navigator.navigate("Edit", {
                foodId,
                foodName,
                nutritionalTable: nutritionalTables[tableIndex],
              });
            }}
          />
          {/* Delete Nutritional Table */}
          <FoodOptionButton
            iconSource={() => (
              <FileDeleteIcon
                color={Colors.white}
                width={28}
                height={28}
                style={{ marginLeft: 6 }}
              />
            )}
            onPress={() => {
              // If the currently selected nutritional table is the last one left, ask for confirmation:
              if (nutritionalTables.length === 1) {
                setShowDeleteAlert(true);
              } else {
                const nutrientsId = nutritionalTables[tableIndex].id;
                deleteNutrients(database, { nutrientsId });
                setTableIndex(tableIndex === 0 ? 0 : tableIndex - 1);
              }
            }}
          />
          {/* Add to Meal */}
          <FoodOptionButton
            iconSource={() => (
              <UtensilsIcon
                width={28}
                height={28}
                style={{ marginRight: 1 }}
                color={Colors.white}
              />
            )}
            onPress={() => {
              const queryReturn = createFoodEntry(database, {
                foodId,
                date,
                amount: quantity,
                unitId: unitId ? unitId : measurementUnits[0].id,
                nutrientsId: nutritionalTables[tableIndex].id,
                mealId,
              });
              console.log(queryReturn);
              navigator.pop(2);
            }}
          />
        </View>
      </>
    );
  }
}
