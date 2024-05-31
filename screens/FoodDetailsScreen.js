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
import GaugeIcon from "../components/icons/GaugeIcon";
import RulerVerticalIcon from "../components/icons/RulerVerticalIcon";

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
    <View>
      <Text text30>{food.name}</Text>
      {/* Change quantity field */}
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
        <Picker
          value={selectedUnit}
          onChange={(element) => {
            setSelectedUnit(element);
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

      {/* Change unit field */}
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
          onChange={(element) => {
            setSelectedUnit(element);
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

      <View
        centerH
        style={{ flexDirection: "row", width: screenWidth - 32, gap: 10 }}
      ></View>
      {/* Macronutrients grid */}
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: screenWidth,
        }}
      >
        <Button
          label="Delete"
          backgroundColor={Colors.red20}
          borderRadius={10}
          onPress={() => navigation.navigate("List")}
        />
        <Button
          label="Edit"
          backgroundColor={Colors.yellow10}
          borderRadius={10}
          onPress={() => navigation.navigate("List")}
        />
      </View>
    </View>
  );
}
