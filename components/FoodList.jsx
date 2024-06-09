import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import FoodListItem from "../components/FoodListItem";

export default function FoodList({ foods, navigationProps }) {
  // Instantiating the navigator.
  const navigator = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.itemsList}>
      {foods.map((food) => {
        return (
          <FoodListItem
            key={food.id}
            food={food}
            handleNavigation={() => {
              navigator.navigate(navigationProps.destination, {
                ...navigationProps.params,
                food: food,
              });
            }}
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
