// Libraries
import { addDatabaseChangeListener, useSQLiteContext } from "expo-sqlite/next";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
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
import getFood from "../queries/getFood";
import getNutritionalTables from "../queries/getNutritionalTables";

// Components
import DeleteFoodDialog from "../components/DeleteFoodDialog";

// Icons
import GaugeIcon from "../components/icons/GaugeIcon";
import RulerVerticalIcon from "../components/icons/RulerVerticalIcon";
import EditIcon from "../components/icons/EditIcon";
import TrashIcon from "../components/icons/TrashIcon";
import PlusIcon from "../components/icons/PlusIcon";
import FileWriteIcon from "../components/icons/FileWriteIcon";
import deleteFood from "../queries/deleteFood";
import getUnits from "../queries/getUnits";
import fixDecimals from "../functions/fixDecimals";

export default function FoodDetailsScreen() {
  // Extracting the device's dimensions
  const screenWidth = Dimensions.get("window").width;

  // Instantiating the navigator.
  const navigator = useNavigation();

  // Connecting to the database.
  const database = useSQLiteContext();

  // Extracting the food's ID and name from the parameters.
  const { id: foodId, name: foodName } = useRoute().params.food;

  // Getting all nutritional tables for the selected food.
  const initialTables = getNutritionalTables(database, { foodId });

  // Setting up stateful variable to hold all available nutritional tables (since they might be altered).
  const [nutritionalTables, setNutritionalTables] = useState(initialTables);

  // Setting up stateful variable to hold the currently selected nutritional table.
  const [nutritionalTable, setNutritionalTable] = useState(initialTables[0]);

  // Retrieving all measurement units used by the food object's nutritional tables.
  const availableUnits = nutritionalTables.map((table) => table.unit);

  // Extracting the relevant information from the currently selected nutritional table.
  const { tableId, baseMeasure, unit, kcals, carbs, fats, protein } =
    nutritionalTable;

  // Creating state for the selected food's currently informed quantity.
  const [quantity, setQuantity] = useState(baseMeasure);

  // Stateful visibility for the delete dialogue.
  const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);

  // Function to calculate how much calories or nutrients there are in a portion.
  const proportion = (number) => {
    return number === 0 ? 0 : (number / baseMeasure) * quantity;
  };

  // Creating a state for the key of the base measure field to manually trigger it's re-rendering.
  const [fieldKey, setFieldKey] = useState(Date.now());

  useEffect(() => {
    const listener = addDatabaseChangeListener(() => {
      // Retrieve the nutritional tables once again.
      const tables = getNutritionalTables(database, { foodId });

      setNutritionalTables(tables);
      setNutritionalTable(tables[0]);
      setQuantity(tables[0].baseMeasure);
      setFieldKey(Date.now());
    });

    // Remove the listener when the component unmounts.
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <>
      <DeleteFoodDialog
        foodDetails={{ foodId, foodName }}
        nutritionalTableDetails={{ tableId, unitSymbol: unit.symbol }}
        visible={showDeleteDialogue}
        setVisible={setShowDeleteDialogue}
      />
      <View>
        <Text text30 style={{ marginLeft: 16, marginVertical: 20 }}>
          {foodName}
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
            key={fieldKey}
            initialNumber={baseMeasure}
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
            value={unit.symbol}
            onChange={(value) => {
              // Retrieves the measurement unit object whose symbol equals the one chosen by the user.
              const userChoice = availableUnits.filter(
                (unit) => unit.symbol === value
              )[0];

              // Retrieves the nutritional table whose unit is the one chosen by the user.
              const selectedTable = nutritionalTables.filter(
                (table) => table.unit === userChoice
              )[0];

              // Updating the currently selected nutritional table.
              setNutritionalTable(selectedTable);

              // Resetting the food amount number input.
              setQuantity(selectedTable.baseMeasure);

              // Manually trigerring the re-rendering of the number input field component.
              setFieldKey(Date.now());
            }}
            style={{
              width: screenWidth - 64,
              height: 36,
              backgroundColor: Colors.grey60,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
          >
            {availableUnits.map((unit) => (
              <Picker.Item
                key={unit.id}
                value={unit.symbol}
                label={unit.symbol}
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
              value: fixDecimals(proportion(kcals)),
              macro: false,
            },
            {
              title: "Carbohydrates",
              value: fixDecimals(proportion(carbs)),
              macro: true,
            },
            {
              title: "Fats",
              value: fixDecimals(proportion(fats)),
              macro: true,
            },
            {
              title: "Protein",
              value: fixDecimals(proportion(protein)),
              macro: true,
            },
          ]}
          renderCustomItem={({ title, value, macro }) => {
            return (
              <View
                key={title}
                style={{
                  width: screenWidth / 2 - 15,
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
              navigator.navigate("Edit", {
                foodId,
                foodName,
                nutritionalTable,
              });
            }}
          />
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            flexDirection: "row",
            marginVertical: 10,
          }}
        >
          <Button
            label="Add nutritional table"
            iconSource={() => {
              return (
                <View width={20} height={20} style={{ marginRight: 6 }}>
                  <PlusIcon color={Colors.white} />
                </View>
              );
            }}
            style={{
              width: screenWidth / 2 + 15,
              padding: 6,
              borderRadius: 10,
              backgroundColor: Colors.green30,
            }}
            onPress={() => {
              navigator.navigate("Add Nutritional Table", {
                foodId,
                foodName,
              });
            }}
          />
        </View>
      </View>
    </>
  );
}
