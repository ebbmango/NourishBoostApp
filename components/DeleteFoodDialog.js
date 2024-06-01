import { Dialog, PanningProvider } from "react-native-ui-lib";
import { View, StyleSheet } from "react-native";
import { Button, Text, Colors } from "react-native-ui-lib";
import { useSQLiteContext } from "expo-sqlite";
import getNutriTablesQuery from "../queries/getNutriTables";

export default function DeleteFoodDialog({
  visible,
  setVisible,
  nutritionalTable,
  navigation,
}) {
  // Retrieving the database.
  const database = useSQLiteContext();

  function handleDelete() {
    console.log(nutritionalTable.tableId);

    database.runSync("DELETE FROM food_nutri_table WHERE id = ?", [
      nutritionalTable.tableId,
    ]);

    setVisible(false);
  }

  return (
    <Dialog
      bottom
      visible={visible}
      onDismiss={() => console.log("dismissed")}
      panDirection={PanningProvider.Directions.DOWN}
      containerStyle={{
        display: "flex",
        alignItems: "center",
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 10,
        gap: 5,
        marginBottom: 130,
      }}
    >
      {/* Warning text */}
      <Text text70>Are you sure you want to delete the nutritional</Text>
      <Text text70>
        information in{" "}
        <Text style={{ fontWeight: "bold" }}>{nutritionalTable.unit}</Text> for
        the food item
      </Text>
      <Text text70BL>"{nutritionalTable.foodName}"?</Text>
      <Text text70BL color={Colors.red10}>
        This action cannot be undone.
      </Text>
      {/* Buttons */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "100%",
          marginTop: 15,
          gap: 3,
        }}
      >
        <Button
          backgroundColor={Colors.red30}
          size={Button.sizes.medium}
          label="Delete"
          onPress={handleDelete}
        />
        <Button
          backgroundColor={Colors.white}
          color={Colors.red30}
          size={Button.sizes.medium}
          label="Cancel"
          onPress={() => {
            // console.log("canceled");
            setVisible(false);
          }}
        />
      </View>
    </Dialog>
  );
}
