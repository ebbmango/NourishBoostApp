// Dependencies
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import FoodsScreen from "../screens/FoodsScreen";
import HomeScreen from "../screens/HomeScreen";
import WeightScreen from "../screens/WeightScreen";

// Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';

// Initializing navigator
const Tab = createBottomTabNavigator();

// Component
export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Foods" component={FoodsScreen} options={{
        tabBarIcon: ({focused, color, size}) => <FontAwesome5 name="clipboard-list" size={24} color={focused ? "blue" : "black"} />
      }}/>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({focused, color, size}) => <MaterialCommunityIcons name="food-fork-drink" size={24} color={focused ? "blue" : "black"} />
      }} />
      <Tab.Screen name="Weight" component={WeightScreen} options={{
        tabBarIcon: ({focused, color, size}) => <Ionicons name="scale" size={24} color={focused ? "blue" : "black"} />
      }}/>
    </Tab.Navigator>
  );
}
