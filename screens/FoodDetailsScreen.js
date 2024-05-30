import { Button, Text, View } from "react-native-ui-lib";

export default function FoodDetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings screen</Text>
      <Button label="Go to List" onPress={() => navigation.navigate("List")} />
    </View>
  );
}
