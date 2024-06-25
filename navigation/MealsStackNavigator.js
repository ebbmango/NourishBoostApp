import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FoodsScreen from "../screens/FoodsListScreen";
import HomeScreen from "../screens/HomeScreen";
import FoodDetailsScreen from "../screens/FoodDetailsScreen";
import NutriTableEditScreen from "../screens/NutriTableEditScreen";
import FoodCreateScreen from "../screens/FoodCreateScreen";
import NutriTableCreateScreen from "../screens/NutriTableCreateScreen";
import EntryEditScreen from "../screens/EntryEditScreen";
import RecipeCreateScreen from "../screens/RecipeCreateScreen";

const MealsStack = createNativeStackNavigator();

export default function MealsStackNavigator() {
  return (
    <MealsStack.Navigator>
      <MealsStack.Screen name="Home" component={HomeScreen} />
      <MealsStack.Screen name="List" component={FoodsScreen} />
      <MealsStack.Screen name="Details" component={FoodDetailsScreen} />
      <MealsStack.Screen name="Edit" component={NutriTableEditScreen} />
      <MealsStack.Screen name="Add Food Item" component={FoodCreateScreen} />
      <MealsStack.Screen name="Create Recipe" component={RecipeCreateScreen} />
      <MealsStack.Screen
        name="Add Nutritional Table"
        component={NutriTableCreateScreen}
      />
      <MealsStack.Screen name="Edit Entry" component={EntryEditScreen} />
    </MealsStack.Navigator>
  );
}
