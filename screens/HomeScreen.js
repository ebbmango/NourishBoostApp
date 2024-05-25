import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSQLiteContext } from "expo-sqlite/next";

export default function HomeScreen() {
  const database = useSQLiteContext();

  const meals = database.getAllSync("SELECT * FROM meals;");

  console.log(meals);

  return (
    <View style={styles.container}>
      {meals.map((meal) => {
        return <Text key={meal.id}>{meal.name}</Text>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
