import React, { useState } from "react";
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

export default function FoodsScreen() {
  const screenWidth = Dimensions.get("window").width;

  const navigator = useNavigation();

  const database = useSQLiteContext();

  const [foods, setFoods] = useState(getFoods(database));

  addDatabaseChangeListener(() => {
    setFoods(getFoods(database));
  });

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
          onChangeText={(text) => {}}
          placeholder={"Search"}
          containerStyle={{
            width: screenWidth - 60,
            height: 36,
            backgroundColor: Colors.white,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: Colors.grey60,
            paddingHorizontal: 10,
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
      <ScrollView contentContainerStyle={styles.itemsList}>
        {foods.map((food) => {
          return (
            <FoodListItem key={food.id} food={food} navigation={navigator} />
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  itemsList: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
});
