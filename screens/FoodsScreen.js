import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSQLiteContext, addDatabaseChangeListener } from "expo-sqlite";
import { Assets, Button, Colors, ListItem } from "react-native-ui-lib";

import PlusIcon from "../components/icons/PlusIcon";

import { FlatList, ScrollView } from "react-native-gesture-handler";
import FoodListItem from "../components/FoodListItem";
import getFoodsQuery from "../queries/getFoods";

export default function FoodsScreen({ navigation }) {
  const database = useSQLiteContext();

  const getFoods = () => database.getAllSync(getFoodsQuery);

  const [foods, setFoods] = useState(getFoods());

  addDatabaseChangeListener(() => {
    setFoods(getFoods());
  });

  return (
    <>
      <View
        style={{
          height: 50,
          width: "100%",
          backgroundColor: Colors.blue70,
          display: "flex",
          alignItems: "flex-end",
          padding: 10,
        }}
      >
        <Button
          iconSource={() => {
            return <PlusIcon color={Colors.white} />;
          }}
          round
          style={{ width: 30, height: 30, padding: 6 }}
          onPress={() => {
            // do something
          }}
        />
      </View>
      <ScrollView contentContainerStyle={styles.itemsList}>
        {foods.map((food) => {
          return (
            <FoodListItem key={food.id} food={food} navigation={navigation} />
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
  },
});
