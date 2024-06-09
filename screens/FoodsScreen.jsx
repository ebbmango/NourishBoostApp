import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Dimensions } from "react-native";
import { useSQLiteContext, addDatabaseChangeListener } from "expo-sqlite";
import {
  View,
  Assets,
  Button,
  Colors,
  ListItem,
  TextField,
} from "react-native-ui-lib";

import PlusIcon from "../components/icons/PlusIcon";

import { FlatList, ScrollView } from "react-native-gesture-handler";
import FoodListItem from "../components/FoodListItem";
import getFoods from "../queries/getFoods";
import { useNavigation } from "@react-navigation/native";
import FoodList from "../components/FoodList";

export default function FoodsScreen() {
  // Retrieving the device's dimensions
  const screenWidth = Dimensions.get("window").width;

  // Instantiating the navigator.
  const navigator = useNavigation();

  // Connecting to the database.
  const database = useSQLiteContext();

  // Retrieving all food items from the database.
  const [foods, setFoods] = useState(getFoods(database));

  useEffect(() => {
    // Retrieving them once more every time an item is deleted.
    const listener = addDatabaseChangeListener(() => {
      setFoods(getFoods(database));
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
      <FoodList foods={searchResults} />
    </>
  );
}