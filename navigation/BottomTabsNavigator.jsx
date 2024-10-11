// External dependencies
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "react-native-ui-lib";

// Icons
import UtensilsIcon from "../components/icons/UtensilsIcon";
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
    </Tab.Navigator>
  );
}
