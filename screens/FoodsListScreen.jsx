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

import TextFieldDialogue from "../components/TextFieldDialogue";
import AlertDialogue from "../components/AlertDialogue";
import { Dimensions, FlatList } from "react-native";
import CarrotIcon from "../components/icons/CarrotIcon";
import foodsListScreenStyles from "../styles/foodsListScreenStyles";
import RecipeIcon from "../components/icons/RecipeIcon";
import FoodIcon from "../components/icons/FoodIcon";
import SparklesIcon from "../components/icons/SparklesIcon";

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
              (food) =>
                food.name.toLowerCase() === newFoodName.toLowerCase().trim()
            )
          ) {
            setShowNameAlert(true);
          } else {
            setShowTextDialogue(false);
            navigator.navigate("Add Food Item", {
              foodName: newFoodName.trim(),
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
        style={{
          width: screenWidth,
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <View
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
            row
            // spread
            style={{
              paddingBottom: 12,
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
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
            <TouchableOpacity row center>
              <Text text70BL white>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              row
              center
              style={{
                // width: (screenWidth * 0.95) / 3 - 8,
                gap: 12,
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Text text70BL white>
                Recipes
              </Text>
              {/* <RecipeIcon height={24} width={24} color={Colors.white} style /> */}
            </TouchableOpacity>
          </View>
          {/* Search Field */}
          <View row center style={{ gap: 8 }}>
            <TextField
              onChangeText={(text) => {
                setSearchParams(text.trim());
              }}
              placeholder={"Search"}
              containerStyle={foodsListScreenStyles.searchField}
            />
            {/* Add food button */}
            <Button
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

// Top bar
// <View style={foodsListScreenStyles.searchBar}>
// {/* Search Field */}
// <TextField
//   onChangeText={(text) => {
//     setSearchParams(text.trim());
//   }}
//   placeholder={"Search"}
//   containerStyle={styles.foodList.searchField}
// />
// {/* Add food button */}
// <Button
//   iconSource={() => {
//     return <PlusIcon color={Colors.white} />;
//   }}
//   backgroundColor={Colors.green30}
//   round
//   style={{ width: 30, height: 30, padding: 6, marginTop: 2 }}
//   onPress={() => {
//     setShowTextDialogue(true);
//   }}
// />
// </View>
{
  /* <View
  row
  center
  style={{
    width: screenWidth,
    // height: 100,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: Colors.green30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  }}
>
  {["Foods", "All", "Recipes"].map((number) => (
    <TouchableOpacity
      row
      key={number}
      center
      style={{ width: screenWidth / 3 - 8, gap: 12 }}
    >
      <CarrotIcon height={20} width={20} color={Colors.white} />
      <Text text70BL white>
        {number}
      </Text>
    </TouchableOpacity>
  ))}
</View> */
}
