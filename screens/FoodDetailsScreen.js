import { Dimensions } from "react-native";
import { Button, GridView, Text, View } from "react-native-ui-lib";

export default function FoodDetailsScreen({ navigation, route }) {
  const screenWidth = Dimensions.get("window").width;
  const food = route.params.food;

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text>{food.name}</Text>
      <GridView
        numColumns={2}
        items={[
          {
            title: "Calories",
            value: food.calories,
            macro: false,
            onPress: () => console.log("item 1 pressed"),
          },
          {
            title: "Carbohydrates",
            value: food.carbs,
            macro: true,
            onPress: () => console.log("item 2 pressed"),
          },
          {
            title: "Fats",
            value: food.fats,
            macro: true,
            onPress: () => console.log("item 3 pressed"),
          },
          {
            title: "Protein",
            value: food.protein,
            macro: true,
            onPress: () => console.log("item 4 pressed"),
          },
        ]}
        renderCustomItem={({ title, value, macro }) => {
          return (
            <View
              style={{
                width: screenWidth / 2 - 20, // Adjust the width for padding/margin
                margin: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text text70>{title}</Text>
              <Text text70BL>
                {value}
                {macro && "g"}
              </Text>
            </View>
          );
        }}
      />
      <Button label="Go to List" onPress={() => navigation.navigate("List")} />
    </View>
  );
}
