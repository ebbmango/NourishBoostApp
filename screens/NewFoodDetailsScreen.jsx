// External dependencies
import { useQuery, useQueryClient } from "react-query";
import { useSQLiteContext } from "expo-sqlite";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
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

export default function NewFoodDetailsScreen() {
  // Connecting to the database.
  const database = useSQLiteContext();

  const { foodId } = useRoute().params;

  // Getting the food's name from the database.
  const { data: foodName = "" } = useQuery(
    "foodName",
    () => getFood(database, { foodId }).name,
    { initialData: "" }
  );

  // Getting the food's nutritional tables from the database.
  const { data: nutritionalTables, isLoading: loadingTables } = useQuery(
    "nutritionalTables",
    () => getNutritionalTables(database, { foodId }),
    { initialData: [] }
  );

  // Getting the food's measurement units from the database.
  const { data: measurementUnits, isLoading: loadingUnits } = useQuery(
    "availableUnits",
    () => getUnits(database, { foodId }),
    { initialData: [] }
  );

  const [selectedTable, setSelectedTable] = useState(0);

  return (
    <>
      <View>
        <Text text30 style={styles.foodDetailsScreen.foodNameStyle}>
          {foodName}
        </Text>
        {/* Field that changes the amount of food */}
        <QuantityField />
        {/* Field that changes the currently selected measurement unit */}
        <UnitPicker />
        {/* Macronutrients grid */}
        <NutrientsGrid
          items={[
            {
              title: "Calories",
              value: 10,
              trailing: "",
            },
            {
              title: "Carbohydrates",
              value: 10,
              trailing: "g",
            },
            {
              title: "Fats",
              value: 10,
              trailing: "g",
            },
            {
              title: "Protein",
              value: 10,
              trailing: "g",
            },
          ]}
        />
      </View>
    </>
  );
}
