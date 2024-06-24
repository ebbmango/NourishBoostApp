import { Colors } from "react-native-ui-lib";
import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width;

const foodsListScreenStyles = StyleSheet.create({
  typeBadge: {
    position: "absolute",
    zIndex: 2,
    right: -8,
    backgroundColor: Colors.white,
    borderRadius: 100,
  },
  itemsList: {
    alignItems: "center",
    gap: 8,
    marginTop: 12,
    paddingBottom: 24,
  },
  searchBar: {
    justifyContent: "center",
    flexDirection: "row",
    width: screenWidth,
    backgroundColor: Colors.green30,
    display: "flex",
    paddingTop: 12,
    paddingBottom: 4,
    gap: 8,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  searchField: {
    width: screenWidth * 0.95 - 36 - 28 - 24,
    height: 36,
    backgroundColor: Colors.white,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.grey60,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
});

export default foodsListScreenStyles;
