// External dependencies
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Button, Colors, TextField, Text } from "react-native-ui-lib";
import { useSQLiteContext, addDatabaseChangeListener } from "expo-sqlite";

// Components
import PlusIcon from "../components/icons/PlusIcon";
import FoodListItem from "../components/FoodListItem";

// Queries
import getFoods from "../queries/getFoods";

// Styles
import styles from "../styles/styles";

import TextFieldDialogue from "../components/TextFieldDialogue";
import AlertDialogue from "../components/AlertDialogue";

export default function FoodsScreen() {
  // Instantiating functionalities.
  const navigator = useNavigation();

  // Connecting to the database.
  const database = useSQLiteContext();

  // Destructuring params from the route.
  const { date, mealId } = useRoute().params;

  // Fetching food items using react-query.
  const { data: foods = [], refetch: refetchFoods } = useQuery(
    "foods",
    () => getFoods(database),
    { initialData: [] }
  );

  // Retrieving them once more every time a change is detected in the foods table.
  useEffect(() => {
    const listener = addDatabaseChangeListener((change) => {
      if (change.tableName === "foods") refetchFoods();
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

  const [showTextDialogue, setShowTextDialogue] = useState(false);
  const [showNameAlert, setShowNameAlert] = useState(false);

  const [newFoodName, setNewFoodName] = useState("");

  return (
    <>
      <AlertDialogue
        visible={showNameAlert}
        setVisible={setShowNameAlert}
        content={{
          alertContent: <Text>The food's name must be unique!</Text>,
          confirmText: "I understand",
        }}
      />
      <TextFieldDialogue
        visible={showTextDialogue}
        setVisible={setShowTextDialogue}
        onConfirm={() => {
          if (
            foods.some(
              (food) => food.name.toLowerCase() === newFoodName.toLowerCase().trim()
            )
          ) {
            setShowNameAlert(true);
          } else {
            setShowTextDialogue(false);
            navigator.navigate("Add Food Item", { foodName: newFoodName.trim() });
          }
        }}
        content={{
          alertContent: (
            <TextField
              containerStyle={styles.dialogues.textField}
              placeholder={"Food name"}
              onChangeText={(text) => {
                setNewFoodName(text);
              }}
            />
          ),
          confirmText: "Proceed",
          cancelText: "Cancel",
        }}
      />
      {/* Top bar */}
      <View style={styles.foodList.greenBar}>
        {/* Seatch Field */}
        <TextField
          onChangeText={(text) => {
            setSearchParams(text.trim());
          }}
          placeholder={"Search"}
          containerStyle={styles.foodList.searchField}
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
            setShowTextDialogue(true);
          }}
        />
      </View>
      {/* Foods list */}
      <ScrollView contentContainerStyle={styles.foodList.itemsList}>
        {/* For each food item */}
        {searchResults.map((food) => {
          return (
            // Render a touchable rectangle that redirects to the relevant food's page.
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
