import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FoodListItem from "../components/FoodListItem";

export default function FoodList({ foods }) {
  return (
    <ScrollView contentContainerStyle={styles.itemsList}>
      {foods.map((food) => {
        return (
          <FoodListItem key={food.id} food={food} navigation={navigator} />
        );
      })}
    </ScrollView>
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
