import { Dialog, PanningProvider } from "react-native-ui-lib";
import { View, StyleSheet } from "react-native";
import { Button, Text, Colors } from "react-native-ui-lib";

export default function DeleteMealDialog({ visible, setVisible, meal }) {
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
      <Text text70>Are you sure you want to delete the meal</Text>
      <Text text70BL>"{meal.name}"?</Text>
      <Text text70>All of its entries will be permanently deleted.</Text>
      <Text text70BL color={Colors.red10}>
        This action cannot be undone.
      </Text>

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
          onPress={() => {
            console.log("deleted");
            setVisible(false);
          }}
        />
        <Button
          backgroundColor={Colors.white}
          color={Colors.red30}
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
