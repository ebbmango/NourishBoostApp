import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "react-native-ui-lib";

const screenWidth = Dimensions.get("window").width;

const button = StyleSheet.create({
  display: "flex",
  borderRadius: 5,
  marginVertical: 10,
});

export default StyleSheet.create({
  dialogues: {
    container: {
      alignItems: "center",
      backgroundColor: Colors.white,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      gap: 5,
      marginBottom: 11,
    },
    buttonsView: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
      gap: 32,
    },
    button: {
      red: {
        ...button,
        backgroundColor: Colors.red10,
      },
      green: {
        ...button,
        backgroundColor: Colors.green10,
      },
      lightRed: {
        ...button,
        backgroundColor: Colors.red50,
      },
      lightGreen: {
        ...button,
        backgroundColor: Colors.green40,
      },
    },
  },
  listScreen: {
    itemsList: {
      flex: 1,
      alignItems: "center",
      gap: 4,
      marginTop: 4,
    },
    greenBar: {
      justifyContent: "center",
      flexDirection: "row",
      height: 54,
      width: "100%",
      backgroundColor: Colors.green60,
      display: "flex",
      padding: 10,
      gap: 8,
      marginBottom: 4,
    },
    searchField: {
      width: screenWidth - 60,
      height: 36,
      backgroundColor: Colors.white,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: Colors.grey60,
      paddingHorizontal: 15,
      justifyContent: "center",
    },
  },
  foodDetailsScreen: {
    foodNameView: {
      flexDirection: "row",
      justifyContent: "center",
      paddingHorizontal: 24,
      marginVertical: 20,
      alignItems: "center",
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
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    nutrientsBoxStyle: {
      width: screenWidth / 2 - 15,
      padding: 10,
      justifyContent: "center",
      backgroundColor: Colors.green40,
      borderRadius: 5,
      marginLeft: 10,
      marginBottom: 10,
      alignItems: "center",
    },
    buttonsView: {
      marginTop: 24,
      height: 260,
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
    },
  },
});
