// External dependencies
import { Dimensions } from "react-native";
import { View, Text, Colors, ListItem } from "react-native-ui-lib";
import { TouchableOpacity } from "react-native-ui-lib/src/incubator";

// Get the screen width
const screenWidth = Dimensions.get("window").width;

export default function FoodListItem({ food, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Details", { food: food });
      }}
    >
      <ListItem style={{ marginTop: 5 }}>
        <View
          centerV
          centerH
          bg-white
          style={{ height: 60, width: screenWidth * 0.95, borderRadius: 10 }}
        >
          <Text text60L>{food.name}</Text>
        </View>
      </ListItem>
    </TouchableOpacity>
  );
}
