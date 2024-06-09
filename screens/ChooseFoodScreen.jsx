import { useRoute } from "@react-navigation/native";
import { addDatabaseChangeListener, useSQLiteContext } from "expo-sqlite";
import { Dimensions, StyleSheet } from "react-native";

import getFoods from "../queries/getFoods";
import FoodList from "../components/FoodList";
import { Colors, Text, TextField, View } from "react-native-ui-lib";
import MagnifyingGlassIcon from "../components/icons/MagnifyingGlassIcon";
import { useEffect, useState } from "react";

export default function ChooseFoodScreen() {
  // Extracting the device's dimensions.
  const screenWidth = Dimensions.get("window").width;

  // Destructuring the date and the meal's id from the params;
  const { date, mealId } = useRoute().params;

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

  const searchResults = foods.filter((food) =>
    food.name.toLowerCase().includes(searchParams.toLowerCase())
  );

  return (
    <>
      <View
        centerH
        style={{ backgroundColor: Colors.green60, paddingVertical: 10 }}
      >
        <TextField
          placeholder={"Search"}
          onChangeText={(text) => {
            setSearchParams(text.trim());
          }}
          containerStyle={{
            width: screenWidth * 0.95,
            height: 36,
            backgroundColor: Colors.white,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: Colors.grey60,
            paddingHorizontal: 15,
            justifyContent: "center",
          }}
        />
      </View>
      <FoodList foods={searchResults} />
    </>
  );
}
