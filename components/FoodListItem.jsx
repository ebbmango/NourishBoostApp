// External dependencies
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { Text, Colors, ListItem } from "react-native-ui-lib";
import { TouchableOpacity } from "react-native-ui-lib/src/incubator";

export default function FoodListItem({ food, handleNavigation }) {
  // Retrieving the device's dimensions
  const screenWidth = Dimensions.get("window").width;

  return (
    <TouchableOpacity onPress={handleNavigation}>
      <ListItem
        style={{
          // Shape
          backgroundColor: Colors.white,
          borderRadius: 16,
          width: screenWidth * 0.95,
          // Layout
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text text60L>{food.name}</Text>
      </ListItem>
    </TouchableOpacity>
  );
}
