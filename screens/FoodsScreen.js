import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSQLiteContext, addDatabaseChangeListener } from "expo-sqlite";
import { Assets, Button, Colors, Icon, Image } from "react-native-ui-lib";
import iconImage from "../assets/icons/plus-solid.svg";

import PlusIcon from "../components/PlusIcon";

export default function FoodsScreen() {
  Assets.loadAssetsGroup("icons", {
    icon1: require("../assets/icons/plus-solid.svg"),
  });

  const database = useSQLiteContext();

  const getFoods = () => database.getAllSync("SELECT * FROM foods;");

  const [foods, setFoods] = useState(getFoods());

  addDatabaseChangeListener(() => {
    setFoods(getFoods());
  });

  console.log(foods);

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
        />
      </View>
      <View style={styles.container}>
        <Text>Foods Screen</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
