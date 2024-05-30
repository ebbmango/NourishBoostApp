import { addDatabaseChangeListener, useSQLiteContext } from "expo-sqlite";
import { Dimensions } from "react-native";
import {
  Button,
  Colors,
  GridView,
  Picker,
  Text,
  View,
} from "react-native-ui-lib";
import getNutriTablesQuery from "../queries/getNutriTables";
import { useEffect, useState } from "react";

export default function FoodDetailsScreen({ navigation, route }) {
  const database = useSQLiteContext();

  const screenWidth = Dimensions.get("window").width;
  const food = route.params.food;

  const nutritionalTables = database.getAllSync(getNutriTablesQuery(food.id));

  //   console.log(nutritionalTables);

  const [selectedUnit, setSelectedUnit] = useState(nutritionalTables[0].unit);

  function getNutriTable(unit) {
    return nutritionalTables.filter((nutriTable) => {
      return nutriTable.unit === unit;
    })[0];
  }

  const [selectedNutriTable, setSelectedNutriTable] = useState(
    getNutriTable(selectedUnit)
  );

  useEffect(() => {
    setSelectedNutriTable(getNutriTable(selectedUnit));
  }, [selectedUnit]);

  //   console.log(selectedNutrient);
  console.log(selectedNutriTable);

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text>{selectedNutriTable.name}</Text>
      <View
        centerH
        style={{ flexDirection: "row", width: screenWidth - 40, gap: 10 }}
      >
        <Text>Measurement unit:</Text>
        <Picker
          value={selectedUnit}
          onChange={(element) => {
            setSelectedUnit(element);
          }}
          style={{
            width: 100,
            marginVertical: 20,
            backgroundColor: Colors.grey50,
            borderRadius: 10,
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

      <GridView
        numColumns={2}
        items={[
          {
            title: "Calories",
            value: selectedNutriTable.calories,
            macro: false,
            onPress: () => console.log("item 1 pressed"),
          },
          {
            title: "Carbohydrates",
            value: selectedNutriTable.carbs,
            macro: true,
            onPress: () => console.log("item 2 pressed"),
          },
          {
            title: "Fats",
            value: selectedNutriTable.fats,
            macro: true,
            onPress: () => console.log("item 3 pressed"),
          },
          {
            title: "Protein",
            value: selectedNutriTable.protein,
            macro: true,
            onPress: () => console.log("item 4 pressed"),
          },
        ]}
        renderCustomItem={({ title, value, macro }) => {
          return (
            <View
              style={{
                width: screenWidth / 2 - 20, // Adjust the width for padding/margin
                margin: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                justifyContent: "center",
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
      <Button label="Go to List" onPress={() => navigation.navigate("List")} />
    </View>
  );
}
