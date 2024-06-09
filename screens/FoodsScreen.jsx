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

export default function FoodsScreen() {
  // Retrieving the device's dimensions
  const screenWidth = Dimensions.get("window").width;

  // Instantiating the navigator.
  const navigator = useNavigation();

  // Connecting to the database.
  const database = useSQLiteContext();

  // Initiating the query client.
  const queryClient = useQueryClient();

  // Fetching food items using react-query
  const { data: foods = [] } = useQuery("foods", () => getFoods(database), {
    initialData: [],
  });

  useEffect(() => {
    // Retrieving them once more every time an item is deleted.
    const listener = addDatabaseChangeListener((change) => {
      if (change.tableName === "foods") queryClient.invalidateQueries("foods");
    });

    // Removes listener once the component unmmounts.
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
      <View
        centerV
        style={{
          flexDirection: "row",
          height: 54,
          width: "100%",
          backgroundColor: Colors.green60,
          display: "flex",
          padding: 10,
          gap: 8,
          marginBottom: 4,
        }}
      >
        {/* Seatch Field */}
        <TextField
          onChangeText={(text) => {
            setSearchParams(text.trim());
          }}
          placeholder={"Search"}
          containerStyle={{
            width: screenWidth - 60,
            height: 36,
            backgroundColor: Colors.white,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: Colors.grey60,
            paddingHorizontal: 15,
            justifyContent: "center",
          }}
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
