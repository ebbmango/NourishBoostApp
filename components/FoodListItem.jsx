// External dependencies
import { useNavigation } from "@react-navigation/native";
import { Dimensions, StyleSheet } from "react-native";
import { Text, Colors, ListItem } from "react-native-ui-lib";
import { TouchableOpacity } from "react-native-ui-lib/src/incubator";

const screenWidth = Dimensions.get("window").width;

// Render a touchable rectangle that redirects to the relevant page
export default function FoodListItem({ foodName, navigate }) {
  return (
    <TouchableOpacity onPress={navigate}>
      <ListItem style={styles.foodListItem}>
        <Text text60L>{foodName}</Text>
      </ListItem>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  foodListItem: {
    // Shape
    backgroundColor: Colors.white,
    borderRadius: 16,
    width: screenWidth * 0.95,
    // Layout
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
