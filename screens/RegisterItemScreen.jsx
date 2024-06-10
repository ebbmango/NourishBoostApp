// External dependencies
import { useQuery, useQueryClient } from "react-query";
import { addDatabaseChangeListener, useSQLiteContext } from "expo-sqlite";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native-ui-lib";

// Components
import QuantityField from "../components/FoodDetails/QuantityField";
import UnitPicker from "../components/FoodDetails/UnitPicker";
import NutrientsGrid from "../components/FoodDetails/NutrientsGrid";

// Queries
import getFood from "../queries/getFood";
import getNutritionalTables from "../queries/getNutritionalTables";
import getUnits from "../queries/getUnits";

// Stylesheets
import styles from "../styles";

export default function FoodDetailsScreen() {
  // Connecting to the database.
  const database = useSQLiteContext();

  const { foodId, date } = useRoute().params;

  // Getting the food's name from the database.
  const { data: foodName = "" } = useQuery(
    "foodName",
    () => getFood(database, { foodId }).name
  );

  // Getting the food's nutritional tables from the database.
  const { data: nutritionalTables, isSuccess: tablesLoaded } = useQuery(
    `nutritionalTables${foodId}`,
    () => getNutritionalTables(database, { foodId })
  );

  // Getting the food's measurement units from the database.
  const { data: measurementUnits, isSuccess: unitsLoaded } = useQuery(
    `availableUnits${foodId}`,
    () => getUnits(database, { foodId })
  );

  const [tableIndex, setTableIndex] = useState(0);

  // LISTENING FOR CHANGES: MIGHT HAVE TO CHANGE LATER

  // useEffect(() => {
  //   const listener = addDatabaseChangeListener((change) => {
  //     // If the change happened to the food.
  //     if (change.tableName === "foods" && change.rowId === foodId)
  //       queryClient.invalidateQueries("foodName");
  //     // If the change happened to a nutritional table:
  //     if (change.tableName === "foodNutritionalTables")
  //       queryClient.invalidateQueries("nutritionalTables");
  //   });
  //   //   Remove the listener when the component unmounts.
  //   return () => {
  //     listener.remove();
  //   };
  // }, []);

  if (tablesLoaded && unitsLoaded)
    return (
      <>
        <View>
          <Text text30 style={styles.foodDetailsScreen.foodNameStyle}>
            {foodName}
          </Text>
          {/* Field that changes the amount of food */}
          <QuantityField
            initialNumber={nutritionalTables[tableIndex].baseMeasure}
          />
          {/* Field that changes the currently selected measurement unit */}
          <UnitPicker
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
                value: nutritionalTables[tableIndex]?.kcals,
                trailing: "",
              },
              {
                title: "Carbohydrates",
                value: nutritionalTables[tableIndex].carbs,
                trailing: "g",
              },
              {
                title: "Fats",
                value: nutritionalTables[tableIndex].fats,
                trailing: "g",
              },
              {
                title: "Protein",
                value: nutritionalTables[tableIndex].protein,
                trailing: "g",
              },
            ]}
          />
        </View>
      </>
    );
}
