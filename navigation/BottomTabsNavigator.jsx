// External dependencies
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors, Text } from "react-native-ui-lib";

// Screens
import FoodsScreen from "../screens/FoodsScreen";
import HomeScreen from "../screens/HomeScreen";
import WeightScreen from "../screens/WeightScreen";
import FoodsStackNavigator from "./FoodsStackNavigator";

// Icons
import PlusIcon from "../components/icons/PlusIcon";
import ListIcon from "../components/icons/ListIcon";
import UtensilsIcon from "../components/icons/UtensilsIcon";
import ScaleIcon from "../components/icons/ScaleIcon";
import ListClipboardIcon from "../components/icons/ListClipboardIcon";
import MealsStackNavigator from "./MealsStackNavigator";

// Initializing navigator
const Tab = createBottomTabNavigator();

// Component
export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Diary"
    >
      <Tab.Screen
        name="Foods"
        component={FoodsStackNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <ListClipboardIcon
              color={focused ? Colors.green30 : Colors.black}
              style={{ width: 26, height: 26 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Diary"
        component={MealsStackNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <UtensilsIcon
              color={focused ? Colors.green30 : Colors.black}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Weight"
        component={WeightScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <ScaleIcon
              color={focused ? Colors.green30 : Colors.black}
              style={{ width: 26, height: 26 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
