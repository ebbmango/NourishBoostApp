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
    buttonsView: {
      marginTop: 10,
      height: 280,
      // flexDirection: "row",
      width: screenWidth,
      justifyContent: "space-between",
      alignItems: "flex-end",
      paddingHorizontal: 16,
    },
    buttonStyle: { width: 48, height: 48, padding: 6, marginTop: 2 },
    nutrientsInputFieldStyle: {
      width: screenWidth - 20,
      height: 36,
      backgroundColor: Colors.grey50,
      borderRadius: 5,
      paddingHorizontal: 10,
      alignItems: "center",
      borderWidth: 1,
      borderColor: Colors.grey50,
    },
    addButton: {
      padding: 6,
      borderRadius: 10,
      backgroundColor: Colors.green30,
      marginTop: 10,
      marginBottom: 20,
    }
  },
});
