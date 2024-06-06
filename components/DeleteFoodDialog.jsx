// External dependencies
import { Dialog, PanningProvider } from "react-native-ui-lib";
import { View, StyleSheet } from "react-native";
import { Button, Text, Colors } from "react-native-ui-lib";
import { useSQLiteContext } from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";

// Queries
import deleteNutritionalTable from "../queries/deleteNutritionalTable";
import getNutritionalTables from "../queries/getNutritionalTables";
import deleteFood from "../queries/deleteFood";

export default function DeleteFoodDialog({
  foodDetails,
  nutritionalTableDetails,
  visible,
  setVisible,
}) {
  // Instantiating the navigator.
  const navigator = useNavigation();

  // Retrieving the database.
  const database = useSQLiteContext();

  // Destructuring the food's ID and name from the parameters.
  const { foodId, foodName } = foodDetails;

  // Destructuring the nutritional table's ID and measurement unit from the parameters.
  const { tableId, unitSymbol } = nutritionalTableDetails;

  async function handleDelete() {
    const nutritionalTables = getNutritionalTables(database, { foodId });

    if (nutritionalTables.length === 1) {
      // delete food
      deleteFood(database, { foodId });
      navigator.navigate("List");
    } else {
      // delete nutritional table
      deleteNutritionalTable(database, { tableId });
      setVisible(false);
    }
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
        information in <Text style={{ fontWeight: "bold" }}>{unitSymbol}</Text>{" "}
        for the food item
      </Text>
      <Text text70BL>"{foodName}"?</Text>
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
            setVisible(false);
          }}
        />
      </View>
    </Dialog>
  );
}
