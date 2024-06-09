// External dependencies
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { Text, Colors, ListItem } from "react-native-ui-lib";
import { TouchableOpacity } from "react-native-ui-lib/src/incubator";

export default function FoodListItem({ food, navigation }) {
  // Get the screen width
  const screenWidth = Dimensions.get("window").width;

  // Instantating the navigator
  const navigator = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigator.navigate("Details", { food: food });
      }}
    >
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
