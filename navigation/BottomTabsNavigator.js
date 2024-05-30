// Dependencies
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import FoodsScreen from "../screens/FoodsScreen";
import HomeScreen from "../screens/HomeScreen";
import WeightScreen from "../screens/WeightScreen";
import FoodsStackNavigator from "./FoodsStackNavigator";

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";

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
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="clipboard-list"
              size={24}
              color={focused ? "blue" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Diary"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="food-fork-drink"
              size={24}
              color={focused ? "blue" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Weight"
        component={WeightScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="scale"
              size={24}
              color={focused ? "blue" : "black"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
