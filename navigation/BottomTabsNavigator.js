// Dependencies
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import FoodsScreen from "../screens/FoodsScreen";
import HomeScreen from "../screens/HomeScreen";
import WeightScreen from "../screens/WeightScreen";

// Initializing navigator
const Tab = createBottomTabNavigator();

// Component
export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Foods" component={FoodsScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Weight" component={WeightScreen} />
    </Tab.Navigator>
  );
}
