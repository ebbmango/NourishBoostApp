import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "react-query";
import { SQLiteProvider } from "expo-sqlite/next";
import { DatabaseProvider, useDatabase } from "./DatabaseContext";
import BottomTabsNavigator from "./navigation/BottomTabsNavigator";

const queryClient = new QueryClient();

const AppContent = () => {
  const { database } = useDatabase();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <SQLiteProvider
          databaseName="database.db"
          options={{ enableChangeListener: true }}
        >
          <NavigationContainer>
            <BottomTabsNavigator />
          </NavigationContainer>
        </SQLiteProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

// Application's entrypoint
export default function App() {
  return (
    <DatabaseProvider>
      <AppContent />
    </DatabaseProvider>
  );
}
