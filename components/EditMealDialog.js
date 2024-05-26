import { Dialog, PanningProvider } from "react-native-ui-lib";
import { View, StyleSheet } from "react-native";
import { Button, Text, Colors, TextField } from "react-native-ui-lib";
import { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

export default function EditMealDialog({ visible, setVisible, meal }) {
  const database = useSQLiteContext();

  const [mealName, setMealName] = useState("");
  const [validity, setValidity] = useState(false);

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
      <Text text70>Enter the desired new name for the meal</Text>
      <Text text70BL>"{meal.name}"</Text>
      <TextField
        placeholder={"Meal name"}
        floatingPlaceholder
        onChangeText={(text) => {
          setMealName(text);
        }}
        onChangeValidity={(validity) => {
          setValidity(validity);
        }}
        enableErrors
        validate={["required"]}
        validationMessage={["The meal's name cannot be empty!"]}
        validateOnChange
        maxLength={20}
        style={{ display: "flex", alignContent: "center" }}
      />

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
          disabled={!validity}
          backgroundColor={Colors.yellow10}
          size={Button.sizes.medium}
          label="Edit"
          onPress={() => {
            database.runSync(
              `UPDATE meals SET name = '${mealName}' WHERE id = ${meal.id};`
            );
            setVisible(false);
          }}
        />
        <Button
          backgroundColor={Colors.white}
          color={Colors.yellow10}
          size={Button.sizes.medium}
          label="Cancel"
          onPress={() => {
            console.log("canceled");
            setVisible(false);
          }}
        />
      </View>
    </Dialog>
  );
}
