// External dependencies
import { useQuery, useQueryClient } from "react-query";
import { addDatabaseChangeListener, useSQLiteContext } from "expo-sqlite";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, Colors, Text, View } from "react-native-ui-lib";

// Components

// Queries
import getFood from "../queries/getFood";
import getNutritionalTables from "../queries/getNutritionalTables";
import getUnits from "../queries/getUnits";

// Stylesheets
import styles from "../styles";
import FoodDetails from "../components/FoodDetails/FoodDetails";
import fixDecimals from "../functions/fixDecimals";
import QuantityField from "../components/FoodDetails/QuantityField";
import UnitPicker from "../components/FoodDetails/UnitPicker";
import NutrientsGrid from "../components/FoodDetails/NutrientsGrid";

export default function RegisterItemScreen() {
  const navigator = useNavigation();

  // Connecting to the database.
  const database = useSQLiteContext();

  const { foodId, date } = useRoute().params;

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
  } = useQuery(`nutritionalTables${foodId}`, () =>
    getNutritionalTables(database, { foodId })
  );

  // Getting the food's measurement units from the database.
  const {
    data: measurementUnits,
    refetch: refetchUnits,
    isSuccess: unitsLoaded,
  } = useQuery(`availableUnits${foodId}`, () => getUnits(database, { foodId }));

  const [tableIndex, setTableIndex] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [tableId, setTableId] = useState(0);

  useEffect(() => {
    if (nutritionalTables) {
      setQuantity(nutritionalTables[tableIndex].baseMeasure);
      setTableId(nutritionalTables[tableIndex].id);
    }
  }, [nutritionalTables]);

  useEffect(() => {
    const listener = addDatabaseChangeListener((change) => {
      console.log(change);
      refetchTables();
      refetchUnits();
      setPickerKey(Date.now());
    });

    return () => {
      listener.remove();
    };
  }, []);

  const proportion = (number) => {
    return number === 0
      ? 0
      : (number / nutritionalTables[tableIndex].baseMeasure) * quantity;
  };

  const [pickerKey, setPickerKey] = useState(Date.now());

  if (tablesLoaded && unitsLoaded) {
    return (
      <>
        <View>
          <Text text30 style={styles.foodDetailsScreen.foodNameStyle}>
            {foodName}
          </Text>
          {/* Field that changes the amount of food */}
          <QuantityField
            initialNumber={nutritionalTables[tableIndex].baseMeasure}
            onChangeNumber={(inputObject) => setQuantity(inputObject.number)}
          />
          {/* Field that changes the currently selected measurement unit */}
          <UnitPicker
            pickerKey={pickerKey}
            value={measurementUnits[tableIndex].id}
            options={measurementUnits}
            onChange={(change) => {
              console.log(change);
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
                trailing: "",
                color: Colors.green40,
              },
              {
                title: "Carbohydrates",
                value: fixDecimals(
                  proportion(nutritionalTables[tableIndex].carbs)
                ),
                trailing: "g",
                color: Colors.green40,
              },
              {
                title: "Fats",
                value: fixDecimals(
                  proportion(nutritionalTables[tableIndex].fats)
                ),
                trailing: "g",
                color: Colors.green40,
              },
              {
                title: "Protein",
                value: fixDecimals(
                  proportion(nutritionalTables[tableIndex].protein)
                ),
                trailing: "g",
                color: Colors.green40,
              },
            ]}
          />
        </View>
      </>
    );
  }
}
