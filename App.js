// Dependencies
import React, { Suspense, useEffect, useState } from "react";
import { SQLiteProvider } from "expo-sqlite/next";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import * as SQLite from "expo-sqlite";

// Assets
import databaseFile from "./assets/database.db";

// Components
import BottomTabsNavigator from "./navigation/BottomTabsNavigator";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

async function openDatabase() {
  // Checks whether an "SQLite" directory exists (within the app's file system!).
  if (
    !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
      .exists
  ) {
    // If it does not exist, it creates one.
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "SQLite"
    );
  }

  // Loads the database file.
  const asset = await Asset.fromModule(databaseFile).downloadAsync();

  // Copies the database from the specified path into the local storage.
  await FileSystem.copyAsync({
    from: asset.localUri,
    to: FileSystem.documentDirectory + "SQLite/database.db",
  });

  // Returns the database object held in the local storage.
  return await SQLite.openDatabaseAsync("database.db");
}

export default function App() {
  const [database, setDatabase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDatabase() {
      try {
        const db = await openDatabase();
        setDatabase(db);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDatabase();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

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
}
