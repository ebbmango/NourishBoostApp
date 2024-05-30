import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FoodsScreen from "../screens/FoodsScreen";
import FoodDetailsScreen from "../screens/FoodDetailsScreen";

const FoodsStack = createNativeStackNavigator();

export default function FoodsStackNavigator() {
  return (
    <FoodsStack.Navigator>
      <FoodsStack.Screen name="List" component={FoodsScreen} />
      <FoodsStack.Screen name="Details" component={FoodDetailsScreen} />
    </FoodsStack.Navigator>
  );
}
