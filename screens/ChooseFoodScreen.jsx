import { useRoute } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import { Dimensions, StyleSheet } from "react-native";

import getFoods from "../queries/getFoods";
import FoodList from "../components/FoodList";
import { Colors, Text, TextField, View } from "react-native-ui-lib";
import MagnifyingGlassIcon from "../components/icons/MagnifyingGlassIcon";

export default function ChooseFoodScreen() {
  // Extracting the device's dimensions.
  const screenWidth = Dimensions.get("window").width;

  // Destructuring the date and the meal's id from the params;
  const { date, mealId } = useRoute().params;

  // Connecting to the database.
  const database = useSQLiteContext();

  // Retrieving the food objects from the database.
  const foods = getFoods(database);

  return (
    <>
      <View
        centerH
        style={{ backgroundColor: Colors.green60, paddingVertical: 10 }}
      >
        <TextField
          onChangeText={(text) => {}}
          containerStyle={{
            width: screenWidth * 0.95,
            height: 36,
            backgroundColor: Colors.white,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: Colors.grey60,
            paddingHorizontal: 10,
            justifyContent: "center",
          }}
        >
          <View
            pointerEvents="none"
            style={{ width: 20, height: 20, position: "absolute", right: 5 }}
          >
            <MagnifyingGlassIcon color={Colors.grey30} />
          </View>
        </TextField>
      </View>
      <FoodList foods={foods} />
    </>
  );
}
