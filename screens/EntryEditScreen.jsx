// External dependencies
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Colors, Text, TouchableOpacity, View } from "react-native-ui-lib";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addDatabaseChangeListener, useSQLiteContext } from "expo-sqlite";

// Components
import FoodOptionButton from "../components/FoodDetails/FoodOptionButton";

// Queries
import getFood from "../queries/getFood";
import getUnits from "../queries/getUnits";
import deleteFood from "../queries/deleteFood";
import getNutritionalTables from "../queries/getNutritionalTables";

// Functions
import fixDecimals from "../functions/fixDecimals";

// Stylesheets
import styles from "../styles/styles";

// Assets
import PencilIcon from "../components/icons/PencilIcon";
import UtensilsIcon from "../components/icons/UtensilsIcon";
import FilePlusIcon from "../components/icons/FilePlusIcon";
import FileWriteIcon from "../components/icons/FileWriteIcon";
import UnitPicker from "../components/FoodDetails/UnitPicker";
import FileDeleteIcon from "../components/icons/FileDeleteIcon";
import QuantityField from "../components/FoodDetails/QuantityField";
import NutrientsGrid from "../components/FoodDetails/NutrientsGrid";
import deleteNutritionalTable from "../queries/deleteNutritionalTable";
import getAllUnits from "../queries/getAllUnits";
import AlertDialogue from "../components/AlertDialogue";
import ConfirmationDialogue from "../components/ConfirmationDialogue";
import createEntry from "../queries/createEntry";
import TrashIcon from "../components/icons/TrashIcon";
import PenIcon from "../components/icons/PenIcon";
import deleteEntry from "../queries/deleteEntry";
import updateEntry from "../queries/updateEntry";

const screenWidth = Dimensions.get("window").width;

export default function EntryEditScreen() {
  // Instantiating the navigator.
  const navigator = useNavigation();

  // Connecting to the database.
  const database = useSQLiteContext();

  // Extracting the relevant data from the router's parameters.
  const {
    entry: { unitId, foodId, id: entryId, amount },
  } = useRoute().params;

  //   console.log(amount);
  //   console.log(selectedUnitId);

  // Retrieving all units from the database.
  const allUnits = getAllUnits(database);

  // Getting the food's name from the database.
  const { data: foodName = "" } = useQuery(
    "foodName",
    () => getFood(database, { foodId: foodId }).name
  );

  // Getting the food's nutritional tables from the database.
  const {
    data: nutritionalTables,
    refetch: refetchTables,
    isSuccess: tablesLoaded,
  } = useQuery("nutritionalTables", () =>
    getNutritionalTables(database, { foodId })
  );

  // Getting the food's measurement units from the database.
  const {
    data: measurementUnits,
    refetch: refetchUnits,
    isSuccess: unitsLoaded,
  } = useQuery("availableUnits", () => getUnits(database, { foodId }));

  // Function that calculates the amount of calories and macronutrients per portion of the selected food.
  const proportion = (number) => {
    return number === 0
      ? 0
      : (number / nutritionalTables[tableIndex].baseMeasure) * quantity;
  };

  // Setting up stateful variables to keep track of the currently selected nutritional table and amount of food.
  const [tableIndex, setTableIndex] = useState(0);
  const [quantity, setQuantity] = useState(amount);

  // Setting up a stateful variable to hold the unit picker's key in order to manually re-render it at will.
  const [pickerKey, setPickerKey] = useState(Date.now());

  // Function that manually rerenders it.
  function rerenderPicker() {
    setPickerKey(Date.now());
  }

  // Refetching the tables and units every time a change happens in the nutritional tables' row in the database.
  useEffect(() => {
    const listener = addDatabaseChangeListener((change) => {
      if (change.tableName === "foodNutritionalTables") {
        refetchTables();
        refetchUnits();
      }
    });

    return () => {
      listener.remove();
    };
  }, []);

  // Re-rendering the unit picker every time the available measurement units change.
  useEffect(() => {
    rerenderPicker();
  }, [measurementUnits]);

  //   console.log(selectedUnitId);

  const [showTablesAlert, setShowTablesAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [selectedUnitId, setSelectedUnitId] = useState(unitId);

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
          initialNumber={amount}
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

            console.log(change);

            setSelectedUnitId(change);

            // Setting the index of the new table.
            setTableIndex(newTableIndex);
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
                const tableId = nutritionalTables[tableIndex].tableId;
                deleteNutritionalTable(database, { tableId });
                setTableIndex(tableIndex === 0 ? 0 : tableIndex - 1);
              }
            }}
          />
          {/* Horizontal Buttons */}
          <View row style={{ gap: 20 }}>
            {/* Delete entry button */}
            <FoodOptionButton
              color={Colors.red30}
              iconSource={() => (
                <TrashIcon
                  width={24}
                  height={24}
                  style={{ marginRight: 1 }}
                  color={Colors.white}
                />
              )}
              onPress={() => {
                deleteEntry(database, { entryId });
                navigator.pop();
              }}
            />
            {/* Edit entry button */}
            <FoodOptionButton
              color={Colors.green30}
              iconSource={() => (
                <PenIcon
                  width={22}
                  height={22}
                  style={{ marginLeft: 1 }}
                  color={Colors.white}
                />
              )}
              onPress={() => {
                updateEntry(database, {
                  unitId,
                  amount: quantity,
                  entryId,
                });
                navigator.pop();
              }}
            />
          </View>
        </View>
      </>
    );
  }
}
