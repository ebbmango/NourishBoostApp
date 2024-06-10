// External dependencies
import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { useSQLiteContext, addDatabaseChangeListener } from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useQueryClient } from "react-query";
import { View, Button, Colors, TextField } from "react-native-ui-lib";

// Components
import FoodList from "../components/FoodList";
import PlusIcon from "../components/icons/PlusIcon";

// Queries
import getFoods from "../queries/getFoods";
import getUnits from "../queries/getUnits";

// Retrieving the device's dimensions
const screenWidth = Dimensions.get("window").width;

export default function FoodsScreen() {
  // Instantiating functionalities.
  const navigator = useNavigation();
  const database = useSQLiteContext();
  const queryClient = useQueryClient();

  // Fetching food items using react-query.
  const { data: foods = [] } = useQuery("foods", () => getFoods(database), {
    initialData: [],
  });

  // Retrieving them once more every time a change is detected in the foods table.
  useEffect(() => {
    const listener = addDatabaseChangeListener((change) => {
      if (change.tableName === "foods") queryClient.invalidateQueries("foods");
    });

    return () => {
      listener.remove();
    };
  }, []);

  // Creating stateful variable to hold the user's search string.
  const [searchParams, setSearchParams] = useState("");

  // Returning only the foods that match the user's search string.
  const searchResults = foods.filter((food) =>
    food.name.toLowerCase().includes(searchParams.toLowerCase())
  );

  return (
    <>
      {/* Top bar */}
      <View style={styles.searchBarStyle}>
        {/* Seatch Field */}
        <TextField
          onChangeText={(text) => {
            setSearchParams(text.trim());
          }}
          placeholder={"Search"}
          containerStyle={styles.searchFieldStyle}
        />
        {/* Add food button */}
        <Button
          iconSource={() => {
            return <PlusIcon color={Colors.white} />;
          }}
          backgroundColor={Colors.green30}
          round
          style={{ width: 30, height: 30, padding: 6, marginTop: 2 }}
          onPress={() => {
            navigator.navigate("Create");
          }}
        />
      </View>
      {/* Foods list */}
      <FoodList
        foods={searchResults}
        navigationProps={{ destination: "Details" }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  searchBarStyle: {
    justifyContent: "center",
    flexDirection: "row",
    height: 54,
    width: "100%",
    backgroundColor: Colors.green60,
    display: "flex",
    padding: 10,
    gap: 8,
    marginBottom: 4,
  },
  searchFieldStyle: {
    width: screenWidth - 60,
    height: 36,
    backgroundColor: Colors.white,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.grey60,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
});
