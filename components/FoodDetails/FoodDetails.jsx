// Libraries
import { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";
import { Colors, Text, TouchableOpacity, View } from "react-native-ui-lib";

// Components
import UnitPicker from "./UnitPicker";
import QuantityField from "./QuantityField";
import NutrientsGrid from "./NutrientsGrid";
import AlertDialogue from "../AlertDialogue";
import FoodOptionButton from "./FoodOptionButton";
import ConfirmationDialogue from "../ConfirmationDialogue";

// Icons
import PencilIcon from "../icons/PencilIcon";
import FilePlusIcon from "../icons/FilePlusIcon";
import FileWriteIcon from "../icons/FileWriteIcon";
import FileDeleteIcon from "../icons/FileDeleteIcon";

// Queries
import deleteFood from "../../queries/deleteFood";
import getAllUnits from "../../queries/getAllUnits";
import deleteNutrients from "../../queries/deleteNutrients";

// Functions
import fixDecimals from "../../functions/fixDecimals";

// Stylesheets
import foodDetailsScreenStyles from "../../styles/foodDetailsScreenStyles";

export default function FoodDetails({
  food,
  selectedTable,
  quantity,
  unitPicker,
}) {
  const navigator = useNavigation();

  const database = useSQLiteContext();

  const allUnits = getAllUnits(database);

  const [showTablesAlert, setShowTablesAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  function proportion(number) {
    return number === 0
      ? 0
      : (number / selectedTable.baseMeasure) * quantity.current;
  }

  function fixMacros(number) {
    return fixDecimals(proportion(number));
  }

  return (
    <>
      {/* Tables Alert */}
      <AlertDialogue
        visible={showTablesAlert}
        setVisible={setShowTablesAlert}
        content={{
          confirmText: "I understand.",
          alertContent: (
            <Text center text70>
              <Text text70BL>Maximum nutritional tables reached.</Text>
              {"\n"}
              There already exists a nutritional table for each measurement
              unit.
            </Text>
          ),
        }}
      />
      {/* Delete Alert */}
      <ConfirmationDialogue
        red
        visible={showDeleteAlert}
        setVisible={setShowDeleteAlert}
        content={{
          confirmText: "Delete",
          cancelText: "Cancel",
          alertContent: (
            <View text70L center gap={8}>
              <Text text70 center>
                This action will permanently delete the food{" "}
                <Text text70BL>{food.name}</Text> from the database.
              </Text>
              <Text red10 text70BL center>
                This action cannot be undone.
              </Text>
            </View>
          ),
        }}
        onConfirm={() => {
          deleteFood(database, { foodId: food.id });
          navigator.pop();
        }}
      />
      {/* Food Details */}
      <View style={foodDetailsScreenStyles.foodNameView}>
        <Text text30>{food.name}</Text>
        <TouchableOpacity style={{ position: "absolute", right: 16 }}>
          <PencilIcon width={24} height={24} color={Colors.grey10} />
        </TouchableOpacity>
      </View>
      <QuantityField
        initialNumber={quantity.current}
        onChangeNumber={(numberField) => quantity.set(numberField.number)}
      />
      <UnitPicker
        key={unitPicker.key}
        value={unitPicker.value}
        options={unitPicker.options}
        onChange={unitPicker.onChange}
      />
      <NutrientsGrid
        items={[
          {
            title: "Calories",
            value: fixMacros(selectedTable.kcals),
          },
          {
            title: "Carbohydrates",
            value: fixMacros(selectedTable.carbs),
          },
          {
            title: "Fats",
            value: fixMacros(selectedTable.fats),
          },
          {
            title: "Protein",
            value: fixMacros(selectedTable.protein),
          },
        ]}
      />

      {/* Buttons */}
      <View style={foodDetailsScreenStyles.buttonsView}>
        {/* Add Nutritional Table */}
        <FoodOptionButton
          onPress={() => {
            // If there is already a nutritional table for each measurement unit.
            if (food.nutritionalTables.length === allUnits.length) {
              setShowTablesAlert(true);
            } else {
              navigator.navigate("Add Nutritional Table", {
                foodId: food.id,
                foodName: food.name,
              });
            }
          }}
          iconSource={() => (
            <FilePlusIcon
              color={Colors.white}
              width={28}
              height={28}
              style={{ marginLeft: 6 }}
            />
          )}
        />
        {/* Edit Nutritional Table */}
        <FoodOptionButton
          onPress={() => {
            navigator.navigate("Edit", {
              foodId: food.id,
              foodName: food.name,
              nutritionalTable: selectedTable,
            });
          }}
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
          onPress={() => {
            if (food.nutritionalTables.length === 1) {
              setShowDeleteAlert(true);
            } else {
              deleteNutrients(database, { nutrientsId: selectedTable.id });
            }
          }}
          iconSource={() => (
            <FileDeleteIcon
              color={Colors.white}
              width={28}
              height={28}
              style={{ marginLeft: 6 }}
            />
          )}
        />
      </View>
    </>
  );
}
