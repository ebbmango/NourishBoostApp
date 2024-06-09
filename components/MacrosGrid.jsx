import { Dimensions, StyleSheet } from "react-native";
import { Colors, GridView, View, Text } from "react-native-ui-lib";

const screenWidth = Dimensions.get("window").width;

export default function MacrosGrid({ calories, carbs, fats, protein }) {
  const items = [
    {
      title: "Calories",
      value: calories,
      trailing: "",
    },
    {
      title: "Carbohydrates",
      value: carbs,
      trailing: "g",
    },
    {
      title: "Fats",
      value: fats,
      trailing: "g",
    },
    {
      title: "Protein",
      value: protein,
      trailing: "g",
    },
  ];

  return (
    <GridView
      numColumns={2}
      items={items}
      renderCustomItem={({ title, value, trailing }) => {
        return (
          <View key={title} style={styles.nutrientBox}>
            <Text text70>{title}</Text>
            <Text text70BL>
              {value}
              {trailing}
            </Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  nutrientBox: {
    width: screenWidth / 2 - 15, // Adjust the width for padding/margin
    padding: 10,
    justifyContent: "center",
    backgroundColor: Colors.green30,
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 10,
    alignItems: "center",
  },
});
