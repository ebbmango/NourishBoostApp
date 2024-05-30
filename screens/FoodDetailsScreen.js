import { Button, Text, View } from "react-native-ui-lib";

export default function FoodDetailsScreen({ navigation, route }) {
  const food = route.params.food;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{food.name}</Text>
      <Button label="Go to List" onPress={() => navigation.navigate("List")} />
    </View>
  );
}
