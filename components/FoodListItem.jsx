// External dependencies
import { useState } from "react";
import { Dimensions } from "react-native";
import { View, Text, Colors, ListItem } from "react-native-ui-lib";
import { TouchableOpacity } from "react-native-ui-lib/src/incubator";

// Get the screen width
const screenWidth = Dimensions.get("window").width;

export default function FoodListItem({ food, navigation }) {
  const [touched, setTouched] = useState(false);

  if (touched) {
    setTimeout(() => {
      setTouched(false)
    }, 1000)
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Details", { food: food });
        setTouched(true);
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
