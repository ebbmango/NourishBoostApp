import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useSQLiteContext } from "expo-sqlite/next";
import {
  View,
  TextField,
  Text,
  Button,
  Drawer,
  Colors,
} from "react-native-ui-lib";
import MealDrawer from "../components/MealDrawer";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const database = useSQLiteContext();

  const meals = database.getAllSync("SELECT * FROM meals;");

  console.log(meals);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {meals.map((meal) => {
        return <MealDrawer key={meal.id} meal={meal} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
});
