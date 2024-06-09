import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FoodsScreen from "../screens/FoodsScreen";
import ChooseFoodScreen from "../screens/ChooseFoodScreen";
import HomeScreen from "../screens/HomeScreen";

const MealsStack = createNativeStackNavigator();

export default function MealsStackNavigator() {
  return (
    <MealsStack.Navigator>
      <MealsStack.Screen name="Home" component={HomeScreen} />
      <MealsStack.Screen name="Register item" component={ChooseFoodScreen} />
    </MealsStack.Navigator>
  );
}
