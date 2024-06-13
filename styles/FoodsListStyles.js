import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "react-native-ui-lib";

const screenWidth = Dimensions.get("window").width;

export default StyleSheet.create({
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
});