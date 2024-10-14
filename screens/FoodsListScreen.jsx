// External dependencies
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Button,
  Colors,
  TextField,
  Text,
  TouchableOpacity,
} from "react-native-ui-lib";
import { useSQLiteContext, addDatabaseChangeListener } from "expo-sqlite";

// Components
import PlusIcon from "../components/icons/PlusIcon";
import FoodListItem from "../components/FoodListItem";

// Queries
import getFoods from "../queries/getFoods";

// Styles
import styles from "../styles/styles";
const screenWidth = Dimensions.get("window").width;

import CreateFoodDialogue from "../components/CreateFoodDialogue";
import AlertDialogue from "../components/AlertDialogue";
import { Dimensions, FlatList } from "react-native";
import foodsListScreenStyles from "../styles/foodsListScreenStyles";

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
  const [foodType, setFoodType] = useState("food");

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
      <CreateFoodDialogue
        // Food creation confirmation dialogue
        visible={showTextDialogue}
        setVisible={setShowTextDialogue}
        type={{ selected: foodType, set: setFoodType }}
        onConfirm={() => {
          if (
            foods.some(
              (food) =>
                food.name.toLowerCase() === newFoodName.toLowerCase().trim()
            )
          ) {
            setShowNameAlert(true);
          } else {
            setShowTextDialogue(false);
            if (foodType === "food")
              navigator.navigate("Add Food Item", {
                foodName: newFoodName.trim(),
              });

            if (foodType === "recipe")
              navigator.navigate("Create Recipe", {
                recipeName: newFoodName.trim(),
              });
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

      {/* Foods list */}
      <FlatList
        contentContainerStyle={foodsListScreenStyles.itemsList}
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FoodListItem
            key={item.id}
            foodName={item.name}
            foodType={item.type}
            navigate={() =>
              navigator.navigate("Details", { foodId: item.id, mealId, date })
            }
          />
        )}
      />
      <View
        // Bottom-screen searchbox view
        style={{
          width: screenWidth,
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <View
          // Green background
          style={{
            width: screenWidth * 0.95,
            backgroundColor: Colors.green30,
            borderTopEndRadius: 24,
            borderTopStartRadius: 24,
            justifyContent: "center",
            paddingVertical: 12,
            shadowColor: "#000",
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 1,
            shadowRadius: 3.84,
            elevation: 32,
          }}
        >
          <View
            // Top row (type buttons) view
            row
            style={{
              paddingBottom: 12,
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              // Foods button
              row
              center
              style={{
                gap: 12,
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Text text70BL white>
                Foods
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              // "All" button
              row
              center
            >
              <Text text70BL white>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              // "Recipes" button
              row
              center
              style={{
                gap: 12,
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Text text70BL white>
                Recipes
              </Text>
            </TouchableOpacity>
          </View>
          <View row center style={{ gap: 8 }}>
            <TextField
              // Searchfield
              onChangeText={(text) => {
                setSearchParams(text.trim());
              }}
              placeholder={"Search"}
              containerStyle={foodsListScreenStyles.searchField}
            />
            <Button
              // Add food button
              iconSource={() => {
                return <PlusIcon color={Colors.green20} />;
              }}
              backgroundColor={Colors.white}
              round
              style={{ width: 30, height: 30, padding: 6, marginTop: 2 }}
              onPress={() => {
                setShowTextDialogue(true);
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
}
