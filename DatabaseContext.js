import React, { createContext, useContext, useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import * as SQLite from "expo-sqlite";
import { Text, View } from "react-native-ui-lib";
import databaseFile from "./assets/database.db";

// Create a Context for the database
const DatabaseContext = createContext(null);

export const DatabaseProvider = ({ children }) => {
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

  return (
    <DatabaseContext.Provider value={{ database, setDatabase }}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      ) : (
        children
      )}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => useContext(DatabaseContext);

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
