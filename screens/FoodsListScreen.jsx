// External dependencies
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Button, Colors, TextField } from "react-native-ui-lib";
import { useSQLiteContext, addDatabaseChangeListener } from "expo-sqlite";

// Components
import PlusIcon from "../components/icons/PlusIcon";
import FoodListItem from "../components/FoodListItem";

// Queries
import getFoods from "../queries/getFoods";

// Styles
import styles from "../styles/FoodsListStyles";

export default function FoodsScreen() {
  // Instantiating functionalities.
  const navigator = useNavigation();

  const database = useSQLiteContext();

  const queryClient = useQueryClient();

  // Destructuring params from the route.
  const { date, mealId } = useRoute().params;

  console.log("List", date, mealId);

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
      <View style={styles.greenBar}>
        {/* Seatch Field */}
        <TextField
          onChangeText={(text) => {
            setSearchParams(text.trim());
          }}
          placeholder={"Search"}
          containerStyle={styles.searchField}
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
      <ScrollView contentContainerStyle={styles.itemsList}>
        {/* For each food item */}
        {searchResults.map((food) => {
          return (
            // Render a touchable rectangle that redirects to the relevant page
            <FoodListItem
              key={food.id}
              foodName={food.name}
              navigate={() =>
                navigator.navigate("Details", { foodId: food.id, mealId, date })
              }
            />
          );
        })}
      </ScrollView>
    </>
  );
}
