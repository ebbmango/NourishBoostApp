// Libraries
import { addDatabaseChangeListener, useSQLiteContext } from "expo-sqlite/next";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import {
  Button,
  Colors,
  GridView,
  NumberInput,
  Picker,
  Text,
  View,
} from "react-native-ui-lib";

// Queries
import getNutriTablesQuery from "../queries/getNutriTables";

// Components
import DeleteFoodDialog from "../components/DeleteFoodDialog";

// Icons
import GaugeIcon from "../components/icons/GaugeIcon";
import RulerVerticalIcon from "../components/icons/RulerVerticalIcon";
import EditIcon from "../components/icons/EditIcon";
import TrashIcon from "../components/icons/TrashIcon";

export default function FoodDetailsScreen({ navigation, route }) {
  // Retrieving the database.
  const database = useSQLiteContext();

  // Retrieving the screen's width.
  const screenWidth = Dimensions.get("window").width;

  const [nutritionalTables, setNutritionalTables] = useState(
    database.getAllSync(getNutriTablesQuery, {
      $food_id: route.params.food.id,
    })
  );

  // Creating stateful variables for the measurement unit and the quantity and
  // setting their initial values to those of the food's first nutritional table.
  const [selectedUnit, setSelectedUnit] = useState(nutritionalTables[0].unit);
  const [quantity, setQuantity] = useState(nutritionalTables[0].baseMeasure);

  // Function to retrieve the nutritional table that uses the correct measurement unit.
  function getNutriTable(unit) {
    return nutritionalTables.filter((nutriTable) => {
      return nutriTable.unit === unit;
    })[0];
  }

  // Creating a stateful variable for the current nutritional table and setting
  // its initial value to the one that uses the currently selected measurement unit.
  const [nutritionalTable, setNutritionalTable] = useState(
    getNutriTable(selectedUnit)
  );

  // Creating a key to manually re-render the <InputNumber/> component.
  const [inputKey, setInputKey] = useState(Date.now());

  // Function to calculate the quantities fo each macronutrient in the food
  // according to its currently informed portion.
  function calculateProportion(number) {
    if (number === 0) return 0;

    return (number / nutritionalTable.baseMeasure) * quantity;
  }

  // Object to hold all the details of the currently informed food portion.
  const portionDetails = {
    calories: calculateProportion(nutritionalTable.calories),
    carbs: calculateProportion(nutritionalTable.carbs),
    fats: calculateProportion(nutritionalTable.fats),
    protein: calculateProportion(nutritionalTable.protein),
  };

  // Handles the display of the deletion dialogue.
  const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);

  // Handles changes everytime the user deletes a table.
  useEffect(() => {
    const listener = addDatabaseChangeListener(() => {
      const tables = database.getAllSync(getNutriTablesQuery, {
        $food_id: route.params.food.id,
      });

      if (tables.length === 0) {
        navigation.navigate("List");
        database.runSync("DELETE FROM foods WHERE id = ?", [
          route.params.food.id,
        ]);
      } else {
        setNutritionalTables(tables);
        setNutritionalTable(tables[0]);
        setSelectedUnit(tables[0].unit);
        setQuantity(tables[0].baseMeasure);
        setInputKey(Date.now());
      }
    });

    return () => {
      listener.remove();
    };
  }, []);


  return (
    <>
      <DeleteFoodDialog
        navigation={navigation}
        nutritionalTable={nutritionalTable}
        visible={showDeleteDialogue}
        setVisible={setShowDeleteDialogue}
      />
      <View>
        <Text text30 style={{ marginLeft: 16, marginVertical: 20 }}>
          {nutritionalTable.foodName}
        </Text>
        {/* Field that changes the amount of food */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
            marginLeft: 16,
          }}
        >
          <View width={24} height={24}>
            <GaugeIcon />
          </View>
          <NumberInput
            key={inputKey}
            initialNumber={quantity}
            onChangeNumber={(numberInput) => {
              setQuantity(numberInput.number);
            }}
            containerStyle={{
              width: screenWidth - 64,
              height: 36,
              backgroundColor: Colors.grey60,
              borderRadius: 5,
              paddingHorizontal: 10,
              alignItems: "center",
            }}
          />
        </View>
        {/* Field that changes the currently selected measurement unit */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
            marginTop: 12,
            marginLeft: 16,
          }}
        >
          <View width={24} height={24}>
            <RulerVerticalIcon />
          </View>
          <Picker
            value={selectedUnit}
            onChange={(unit) => {
              setSelectedUnit(unit);
              const newSelectedTable = getNutriTable(unit);
              setNutritionalTable(newSelectedTable);
              setQuantity(newSelectedTable.baseMeasure);
            }}
            style={{
              width: screenWidth - 64,
              height: 36,
              backgroundColor: Colors.grey60,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
          >
            {nutritionalTables.map((nutritionalTable) => (
              <Picker.Item
                key={nutritionalTable.unit}
                value={nutritionalTable.unit}
                label={nutritionalTable.unit}
              />
            ))}
          </Picker>
        </View>
        {/* Macronutrients grid */}
        <GridView
          numColumns={2}
          items={[
            {
              title: "Calories",
              value: portionDetails.calories,
              macro: false,
            },
            {
              title: "Carbohydrates",
              value: portionDetails.carbs,
              macro: true,
            },
            {
              title: "Fats",
              value: portionDetails.fats,
              macro: true,
            },
            {
              title: "Protein",
              value: portionDetails.protein,
              macro: true,
            },
          ]}
          renderCustomItem={({ title, value, macro }) => {
            return (
              <View
                key={title}
                style={{
                  width: screenWidth / 2 - 15, // Adjust the width for padding/margin
                  padding: 10,
                  justifyContent: "center",
                  backgroundColor: Colors.grey50,
                  borderRadius: 5,
                  marginLeft: 10,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <Text text70>{title}</Text>
                <Text text70BL>
                  {value}
                  {macro && "g"}
                </Text>
              </View>
            );
          }}
        />
        {/* Delete and edit buttons */}
        <View
          style={{
            flexDirection: "row",
            width: screenWidth,
            marginTop: 20,
          }}
        >
          {/* Delete button */}
          <Button
            label="Delete"
            iconSource={() => {
              return (
                <View width={20} height={20} style={{ marginRight: 6 }}>
                  <TrashIcon color={Colors.white} />
                </View>
              );
            }}
            style={{
              width: screenWidth / 2 - 15,
              padding: 6,
              borderRadius: 10,
              backgroundColor: Colors.red20,
              marginHorizontal: 10,
            }}
            onPress={() => {
              setShowDeleteDialogue(true);
            }}
          />
          {/* Edit button */}
          <Button
            label="Edit"
            iconSource={() => {
              return (
                <View width={20} height={20} style={{ marginRight: 6 }}>
                  <EditIcon color={Colors.white} />
                </View>
              );
            }}
            style={{
              width: screenWidth / 2 - 15,
              padding: 6,
              borderRadius: 10,
              backgroundColor: Colors.yellow10,
            }}
            onPress={() => {
              navigation.navigate("Edit", {
                nutritionalTable: nutritionalTable,
              });
            }}
          />
        </View>
      </View>
    </>
  );
}
