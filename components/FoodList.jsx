import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import FoodListItem from "../components/FoodListItem";

// Renders a list of food items.
export default function FoodList({ foods, date, mealId }) {
  const navigator = useNavigation();

  console.log("FoodList", date, mealId);

  return (
    <ScrollView contentContainerStyle={styles.itemsList}>
      {/* For each food item */}
      {foods.map((food) => {
        return (
          // Render a touchable rectangle that redirects to the relevant page
          <FoodListItem key={food.id} food={food} date={date} mealId={mealId} />
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
