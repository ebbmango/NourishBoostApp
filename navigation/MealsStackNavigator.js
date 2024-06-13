import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FoodsScreen from "../screens/FoodsListScreen";
import HomeScreen from "../screens/HomeScreen";
import FoodDetailsScreen from "../screens/FoodDetailsScreen";
import FoodCreateScreen from "../screens/FoodEditScreen";
import FoodEditScreen from "../screens/FoodEditScreen";

const MealsStack = createNativeStackNavigator();

export default function MealsStackNavigator() {
  return (
    <MealsStack.Navigator>
      <MealsStack.Screen name="Home" component={HomeScreen} />
      <MealsStack.Screen name="List" component={FoodsScreen} />
      <MealsStack.Screen name="Details" component={FoodDetailsScreen} />
      <MealsStack.Screen name="Create" component={FoodCreateScreen} />
      <MealsStack.Screen name="Edit" component={FoodEditScreen} />
    </MealsStack.Navigator>
  );
}
