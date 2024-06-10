// External dependencies
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { addDatabaseChangeListener, useSQLiteContext } from "expo-sqlite";
import {
  Colors,
  GridView,
  NumberInput,
  Picker,
  Text,
  View,
} from "react-native-ui-lib";

// Components
import GaugeIcon from "../components/icons/GaugeIcon";
import RulerVerticalIcon from "../components/icons/RulerVerticalIcon";

// Queries
import getNutritionalTables from "../queries/getNutritionalTables";

// Functions
import fixDecimals from "../functions/fixDecimals";
import getFood from "../queries/getFood";
import { useQuery, useQueryClient } from "react-query";

export default function FoodDetails({ foodId, selectedTableId, quantity }) {
  // Extracting the device's dimensions
  const screenWidth = Dimensions.get("window").width;

  // Connecting to the database.
  const database = useSQLiteContext();

  // Instantiating the query client.
  const queryClient = useQueryClient();

  // Setting up query for the food name.
  const { data: foodName = "" } = useQuery(
    "foodName",
    () => getFood(database, { foodId }).name,
    { initialData: "" }
  );

  // Setting up query for the nutritional tables.
  const { data: nutritionalTables, isLoading: loadingTables } = useQuery(
    "nutritionalTables",
    () => getNutritionalTables(database, { foodId }),
    { initialData: [] }
  );

  // Listening for changes in the database.
  useEffect(() => {
    const listener = addDatabaseChangeListener((change) => {
      //   console.log(change);
      // If the change happened to the food.
      if (change.tableName === "foods" && change.rowId === foodId)
        queryClient.invalidateQueries("foodName");
      // If the change happened to a nutritional table:
      if (change.tableName === "foodNutritionalTables")
        queryClient.invalidateQueries("nutritionalTables");
    });
    //   Remove the listener when the component unmounts.
    return () => {
      listener.remove();
    };
  }, []);

  return <></>;
}
