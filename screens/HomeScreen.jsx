import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useSQLiteContext, addDatabaseChangeListener } from "expo-sqlite/next";
import MealDrawer from "../components/MealDrawer";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const database = useSQLiteContext();

  const getMeals = () => database.getAllSync("SELECT * FROM meals;");

  const [meals, setMeals] = useState(getMeals());

  addDatabaseChangeListener(() => {
    setMeals(getMeals());
  });

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
