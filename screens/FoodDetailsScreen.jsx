// External dependencies
import { Dimensions } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { addDatabaseChangeListener, useSQLiteContext } from "expo-sqlite";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, Colors, Text, View } from "react-native-ui-lib";

// Components
import CreateTableButton from "../components/FoodDetails/CreateTableButton";
import EditTableButton from "../components/FoodDetails/EditTableButton";
import DeleteTableButton from "../components/FoodDetails/DeleteTableButton";

// Queries
import getFood from "../queries/getFood";
import getNutritionalTables from "../queries/getNutritionalTables";
import getUnits from "../queries/getUnits";

// Stylesheets
import styles from "../styles/styles";
import FoodDetails from "../components/FoodDetails/FoodDetails";
import fixDecimals from "../functions/fixDecimals";
import EditIcon from "../components/icons/EditIcon";
import FoodBowlIcon from "../components/icons/FoodBowlIcon";
import UtensilsIcon from "../components/icons/UtensilsIcon";
import FoodOptionButton from "../components/FoodDetails/FoodOptionButton";
import FileDeleteIcon from "../components/icons/FileDeleteIcon";
import FileWriteIcon from "../components/icons/FileWriteIcon";
import FilePlusIcon from "../components/icons/FilePlusIcon";

const screenWidth = Dimensions.get("window").width;

export default function FoodDetailsScreen() {
  const navigator = useNavigation();

  // Connecting to the database.
  const database = useSQLiteContext();
  const queryClient = useQueryClient();

  const { foodId, mealId, date } = useRoute().params;

  console.log(foodId, mealId, date);

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

  useEffect(() => {
    if (nutritionalTables) {
      setQuantity(nutritionalTables[tableIndex].baseMeasure);
    }
  }, [nutritionalTables]);

  const proportion = (number) => {
    return number === 0
      ? 0
      : (number / nutritionalTables[tableIndex].baseMeasure) * quantity;
  };

  if (tablesLoaded && unitsLoaded) {
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
