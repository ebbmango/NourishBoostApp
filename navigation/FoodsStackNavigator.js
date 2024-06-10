import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FoodsScreen from "../screens/FoodsScreen";
import FoodEditScreen from "../screens/FoodEditScreen";
import FoodCreateScreen from "../screens/FoodCreateScreen";
import NutriTableCreateScreen from "../screens/NutriTableCreateScreen";
import FoodDetailsScreen from "../screens/FoodDetailsScreen";

const FoodsStack = createNativeStackNavigator();

export default function FoodsStackNavigator() {
  return (
    <FoodsStack.Navigator>
      <FoodsStack.Screen name="List" component={FoodsScreen} />
      <FoodsStack.Screen name="Details" component={FoodDetailsScreen} />
      <FoodsStack.Screen name="Edit" component={FoodEditScreen} />
      <FoodsStack.Screen name="Create" component={FoodCreateScreen} />
      <FoodsStack.Screen name="Add Nutritional Table" component={NutriTableCreateScreen} />
    </FoodsStack.Navigator>
  );
}
