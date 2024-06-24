import { Colors } from "react-native-ui-lib";
import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width;

const foodDetailsScreenStyles = StyleSheet.create({
  foodNameView: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonsView: {
    marginTop: 24,
    gap: 24,
    width: screenWidth,
    alignItems: "flex-end",
    paddingHorizontal: 16,
    justifyContent: "flex-end",
  },
});

export default foodDetailsScreenStyles;
