// External dependencies
import { useNavigation } from "@react-navigation/native";
import { Dimensions, StyleSheet } from "react-native";
import { Text, Colors, ListItem, View } from "react-native-ui-lib";
import { TouchableOpacity } from "react-native-ui-lib/src/incubator";
import foodsListScreenStyles from "../styles/foodsListScreenStyles";
import DuotoneChefIcon from "./icons/DuotoneChefIcon";
import DuotoneBowlChopsticksIcon from "./icons/DuotoneBowlChopsticksIcon";

const screenWidth = Dimensions.get("window").width;

// Render a touchable rectangle that redirects to the relevant page
export default function FoodListItem({ foodName, foodType, navigate }) {
  // const badgeProps = {
  //   primaryColor: Colors.white,
  //   secondaryColor: Colors.green30,
  //   width: 20,
  //   height: 20,
  //   style: foodsListScreenStyles.typeBadge,
  // };

  // const foodType = "food";

  return (
    <TouchableOpacity row center onPress={navigate}>
      {/* <View style={{ position: "absolute", zIndex: 1, right: -8 }} /> */}
      <View style={styles.foodListItem}>
        {foodType === "food" ? (
          <DuotoneBowlChopsticksIcon
            style={{
              position: "absolute",
              transform: [{ rotate: "-10deg" }],
              bottom: -10,
              right: 5,
            }}
            width={50}
            height={50}
            primary={Colors.green70}
            secondary={Colors.green50}
          />
        ) : (
          <DuotoneChefIcon
            style={{
              position: "absolute",
              // top: ,
              // transform: [{ rotate: "135deg" }],
              bottom: 0,
              right: 0,
            }}
            width={56}
            height={56}
            primary={Colors.green70}
            secondary={Colors.green50}
          />
        )}

        <Text text60L>{foodName}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  foodListItem: {
    width: screenWidth * 0.8,
    height: "auto",
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    zIndex: -1,
    overflow: "hidden",
  },
});
