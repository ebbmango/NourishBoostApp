// External dependencies
import { useQuery, useQueryClient } from "react-query";
import { addDatabaseChangeListener, useSQLiteContext } from "expo-sqlite";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, Colors, Text, View } from "react-native-ui-lib";

// Components
import CreateTableButton from "../components/FoodDetails/CreateTableButton";
import EditTableButton from "../components/FoodDetails/EditTableButton";
import DeleteTableButton from "../components/FoodDetails/DeleteTableButton";
import DeleteFoodButton from "../components/FoodDetails/DeleteFoodButton";

// Queries
import getFood from "../queries/getFood";
import getNutritionalTables from "../queries/getNutritionalTables";
import getUnits from "../queries/getUnits";

// Stylesheets
import styles from "../styles";
import FoodDetails from "../components/FoodDetails/FoodDetails";
import fixDecimals from "../functions/fixDecimals";

export default function FoodDetailsScreen() {
  const navigator = useNavigation();

  // Connecting to the database.
  const database = useSQLiteContext();

  const { foodId } = useRoute().params;

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
  const [quantity, setQuantity] = useState(0);
  const [tableId, setTableId] = useState(0);

  useEffect(() => {
    if (nutritionalTables) {
      setQuantity(nutritionalTables[tableIndex].baseMeasure);
      setTableId(nutritionalTables[tableIndex].id);
    }
  }, [nutritionalTables]);

  const proportion = (number) => {
    return number === 0
      ? 0
      : (number / nutritionalTables[tableIndex].baseMeasure) * quantity;
  };

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

  if (tablesLoaded && unitsLoaded) {
    console.log(quantity);
    return (
      <>
        <FoodDetails
          foodName={foodName}
          numberField={{
            initialNumber: nutritionalTables[tableIndex].baseMeasure,
            onChangeNumber: (inputObject) => setQuantity(inputObject.number),
          }}
          unitPicker={{
            initialValue: measurementUnits[tableIndex].id,
            options: measurementUnits,
            onChange: (change) => {
              // Finding the index of the new table.
              const newTableIndex = nutritionalTables.findIndex(
                (table) => table.unit.id === change
              );
              // Setting the index of the new table.
              setTableIndex(newTableIndex);
            },
          }}
          nutrientsGrid={{
            items: [
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
            ],
          }}
        />

        <View style={styles.foodDetailsScreen.buttonsView}>
          <CreateTableButton
            onPress={() => {
              console.log("create table!");
              // navigator.navigate("Create", { tableId, foodId });
            }}
          />
          <EditTableButton
            onPress={() => {
              console.log("edit table!");
              // navigator.navigate("Edit", { tableId, foodId });
            }}
          />
          <DeleteTableButton
            onPress={() => {
              console.log("delete table!");
            }}
          />
          <DeleteFoodButton
            onPress={() => {
              console.log("delete food!");
            }}
          />
        </View>
      </>
    );
  }
}
