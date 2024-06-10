import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "react-native-ui-lib";

const screenWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  foodDetailsScreen: {
    foodNameStyle: {
      marginLeft: 16,
      marginVertical: 20,
    },
    fieldViewStyle: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
      marginLeft: 16,
      marginBottom: 10,
    },
    inputFieldStyle: {
      width: screenWidth - 64,
      height: 36,
      backgroundColor: Colors.grey60,
      borderRadius: 5,
      paddingHorizontal: 10,
      alignItems: "center",
    },
    nutrientsBoxStyle: {
      width: screenWidth / 2 - 15,
      padding: 10,
      justifyContent: "center",
      backgroundColor: Colors.grey50,
      borderRadius: 5,
      marginLeft: 10,
      marginBottom: 10,
      alignItems: "center",
    },
  },
});
