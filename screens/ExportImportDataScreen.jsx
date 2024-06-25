import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { Button, View } from "react-native-ui-lib";
import React from "react";
import { Alert } from "react-native";
import * as SQLite from "expo-sqlite";
import getFoods from "../queries/getFoods";
import { useDatabase } from "../DatabaseContext";

export default function ExportImportDataScreen() {
  const oldDatabase = SQLite.useSQLiteContext();

  const { setDatabase } = useDatabase();

  async function openDatabase() {
    try {
      // Checks whether an "SQLite" directory exists (within the app's file system!).
      const directoryInfo = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + "SQLite"
      );
      if (!directoryInfo.exists) {
        // If it does not exist, it creates one.
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "SQLite"
        );
      }

      // Return the database object held in the local storage.
      const db = await SQLite.openDatabaseAsync("database.db");
      console.log("Database opened:", db);
      return db;
    } catch (error) {
      console.error("Error opening database:", error);
      throw error;
    }
  }

  const importDatabase = async () => {
    try {
      // Request the user to select a database file
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: false,
      });

      const sourceUri = result.assets[0].uri;
      const destinationUri =
        FileSystem.documentDirectory + "SQLite/database.db";

      // Copy the selected database file to the app's local storage
      await FileSystem.copyAsync({
        from: sourceUri,
        to: destinationUri,
      });
      console.log("Database file copied from", sourceUri, "to", destinationUri);

      // Open the new database
      Alert.alert("Success", "Database imported successfully!");
      return await openDatabase();
    } catch (error) {
      console.error("An error occurred during import:", error);
      Alert.alert("Error", `Could not import file: ${error.message}`);
    }
  };

  // Function to request directory permissions
  const requestFileWritePermission = async () => {
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    console.log("Permissions granted:", permissions.granted);
    if (!permissions.granted) {
      console.log("File write Permissions Denied!!");
      Alert.alert("Error", "File Permissions Denied");
      return {
        access: false,
        directoryUri: null,
      };
    }
    return {
      access: true,
      directoryUri: permissions.directoryUri,
    };
  };

  // Function to save the file
  const saveReportFile = async (fileData, directoryUri) => {
    try {
      const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
        directoryUri,
        "database.db",
        "application/octet-stream"
      );
      await FileSystem.writeAsStringAsync(fileUri, fileData, {
        encoding: FileSystem.EncodingType.Base64,
      });
      Alert.alert("Success", "File Saved Successfully");
    } catch (error) {
      console.error("Error saving file:", error);
      Alert.alert("Error", `Could not save file: ${error.message}`);
    }
  };

  // Function to check and export the database
  const exportDatabase = async () => {
    try {
      const info = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + "SQLite/database.db"
      );
      console.log("Database file info:", info);

      if (!info.exists) {
        console.error("Database file does not exist.");
        Alert.alert("Error", "Database file does not exist.");
        return;
      }

      const fileData = await FileSystem.readAsStringAsync(
        FileSystem.documentDirectory + "SQLite/database.db",
        { encoding: FileSystem.EncodingType.Base64 }
      );

      const permissions = await requestFileWritePermission();
      if (permissions.access) {
        await saveReportFile(fileData, permissions.directoryUri);
      }
    } catch (error) {
      console.error("An error occurred during export:", error);
      Alert.alert("Error", `An error occurred: ${error.message}`);
    }
  };

  return (
    <View center style={{ marginTop: 24 }}>
      <Button label={"Export"} onPress={exportDatabase} />
      <Button
        label={"Import"}
        onPress={async () => {
          const newDatabase = await importDatabase();

          await oldDatabase.closeAsync();

          setDatabase(newDatabase);
          // console.log(getFoods(database));
        }}
      />
    </View>
  );
}
