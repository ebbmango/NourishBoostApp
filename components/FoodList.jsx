import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import FoodListItem from "../components/FoodListItem";

// Renders a list of food items.
export default function FoodList({ foods, navigationProps }) {
  const navigator = useNavigation();

  const handleNavigation = (food) => {
    navigator.navigate(
      // Destination
      navigationProps.destination,
      // Parameters
      {
        ...navigationProps.params, // Receive them from above.
        foodId: food.id, // And add the food item's information.
      }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.itemsList}>
      {/* For each food item */}
      {foods.map((food) => {
        return (
          // Render a touchable rectangle that redirects to the relevant page
          <FoodListItem
            key={food.id}
            food={food}
            handleNavigation={() => handleNavigation(food)}
          />
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
