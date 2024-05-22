// Dependencies
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

// Components
import BottomTabsNavigator from "./navigation/BottomTabsNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabsNavigator />
    </NavigationContainer>
  );
}
