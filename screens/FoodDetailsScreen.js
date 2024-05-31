import { addDatabaseChangeListener, useSQLiteContext } from "expo-sqlite";
import { Dimensions } from "react-native";
import {
  Button,
  Colors,
  GridView,
  NumberInput,
  Picker,
  Text,
  View,
} from "react-native-ui-lib";
import getNutriTablesQuery from "../queries/getNutriTables";
import { useEffect, useRef, useState } from "react";
import GaugeIcon from "../components/icons/GaugeIcon";
import RulerVerticalIcon from "../components/icons/RulerVerticalIcon";
import PlusIcon from "../components/icons/PlusIcon";
import EditIcon from "../components/icons/EditIcon";
import TrashIcon from "../components/icons/TrashIcon";

export default function FoodDetailsScreen({ navigation, route }) {
  // Retrieving the database.
  const database = useSQLiteContext();

  // Retrieving the screen's width.
  const screenWidth = Dimensions.get("window").width;

  // Creating handler for the food object passed as a parameter.
  const foodObject = route.params.food;

  // Getting all the nutritional tables for the currently selected food object.
  const nutritionalTables = database.getAllSync(
    getNutriTablesQuery(foodObject.id)
  );

  // Creating stateful variables for the measurement unit and the quantity and
  // setting their initial values to those of the food's first nutritional table.
  const [selectedUnit, setSelectedUnit] = useState(nutritionalTables[0].unit);
  const [quantity, setQuantity] = useState(nutritionalTables[0].base_measure);

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

  // Hook to automatically update the currently selected nutritional table as soon
  // as the currently selected measurement unit is changes.
  useEffect(() => {
    setNutritionalTable(getNutriTable(selectedUnit));
    // Resetting the quantity (in order to trigger the update of the displayed macronutrients
    // in accordance to the newly selected nutritional table's base measure).
    setQuantity(nutritionalTable.base_measure);
    // Forcing the re-render of the <InputNumber/> component.
    setInputKey(Date.now());
  }, [selectedUnit]);

  // Function to calculate the quantities fo each macronutrient in the food
  // according to its currently informed portion.
  function calculateProportion(number) {
    return (number / nutritionalTable.base_measure) * quantity;
  }

  // Object to hold all the details of the currently informed food portion.
  const foodDetails = {
    name: foodObject.name,
    portion: quantity,
    calories: calculateProportion(nutritionalTable.calories),
    carbs: calculateProportion(nutritionalTable.carbs),
    fats: calculateProportion(nutritionalTable.fats),
    protein: calculateProportion(nutritionalTable.protein),
  };

  return (
    <View>
      <Text text30 style={{ marginLeft: 16, marginVertical: 20 }}>
        {foodDetails.name}
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
      {/* Macronutrients grid */}
      <GridView
        numColumns={2}
        items={[
          {
            title: "Calories",
            value: foodDetails.calories,
            macro: false,
          },
          {
            title: "Carbohydrates",
            value: foodDetails.carbs,
            macro: true,
          },
          {
            title: "Fats",
            value: foodDetails.fats,
            macro: true,
          },
          {
            title: "Protein",
            value: foodDetails.protein,
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
          justifyContent: "space-around",
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
          }}
          onPress={() => navigation.navigate("List")}
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
          onPress={() => navigation.navigate("List")}
        />
      </View>
    </View>
  );
}
