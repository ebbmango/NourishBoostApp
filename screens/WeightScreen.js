import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function WeightScreen() {
  return (
    <View style={styles.container}>
      <Text>Weight Screen</Text>
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
