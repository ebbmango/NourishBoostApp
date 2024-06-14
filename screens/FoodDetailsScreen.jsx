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
import getNutritionalTables from "../queries/getNutritionalTables";

// Functions
import fixDecimals from "../functions/fixDecimals";

// Stylesheets
import styles from "../styles/styles";

// Assets
import UtensilsIcon from "../components/icons/UtensilsIcon";
import FilePlusIcon from "../components/icons/FilePlusIcon";
import FileWriteIcon from "../components/icons/FileWriteIcon";
import UnitPicker from "../components/FoodDetails/UnitPicker";
import FileDeleteIcon from "../components/icons/FileDeleteIcon";
import QuantityField from "../components/FoodDetails/QuantityField";
import NutrientsGrid from "../components/FoodDetails/NutrientsGrid";
import PencilIcon from "../components/icons/PencilIcon";
import deleteNutritionalTable from "../queries/deleteNutritionalTable";
import deleteFood from "../queries/deleteFood";

const screenWidth = Dimensions.get("window").width;

export default function FoodDetailsScreen() {
  // Instantiating the navigator.
  const navigator = useNavigation();

  // Connecting to the database.
  const database = useSQLiteContext();

  // Instantiating the query client.
  const queryClient = useQueryClient();

  // Extracting the relevant data from the router's parameters.
  const { foodId, mealId, date } = useRoute().params;

  // Getting the food's name from the database.
  const { data: foodName = "" } = useQuery(
    "foodName",
    () => getFood(database, { foodId }).name
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

  // Setting up a stateful variable to hold the unit picker's key in order to manually re-render it at will.
  const [pickerKey, setPickerKey] = useState(Date.now());

  // Function that manually rerenders it.
  function rerenderPicker() {
    setPickerKey(Date.now());
  }

  // Every time a change happens in the nutritional tables' row in the database...
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

  useEffect(() => {
    rerenderPicker();
  }, [measurementUnits]);

  if (tablesLoaded && unitsLoaded) {
    return (
      <>
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
              navigator.navigate("Add Nutritional Table", {
                foodId,
                foodName,
              });
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
              const tablesLeft = nutritionalTables.length;
              const tableId = nutritionalTables[tableIndex].tableId;
              // Deleting the nutritional table
              deleteNutritionalTable(database, { tableId });
              // If it was the last one available for this food item:
              if (tablesLeft === 1) {
                // We delete the food item as well.
                deleteFood(database, { foodId });
                navigator.pop();
              } else {
                // We reset the current table index to 0 and refetch tables and units.
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
          />
        </View>
      </>
    );
  }
}
