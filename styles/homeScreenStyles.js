import { Colors } from "react-native-ui-lib";
import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width;

const chartCaption = StyleSheet.create({
  width: 16,
  height: 16,
  borderRadius: 3,
});

const homeScreenStyles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    // paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    paddingBottom: 20,
  },
  pieChartCaptions: {
    protein: {
      ...chartCaption,
      backgroundColor: Colors.green50,
    },
    fats: {
      ...chartCaption,
      backgroundColor: Colors.green30,
    },
    carbs: {
      ...chartCaption,
      backgroundColor: Colors.green10,
    },
  },
  dateBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: screenWidth,
    backgroundColor: Colors.green30,
    paddingHorizontal: 24,
    alignItems: "center",
    paddingVertical: 16,
  },
  macrosOverview: {
    banner: {
      flexDirection: "row",
      position: "absolute",
      top: 0,
      width: screenWidth,
      justifyContent: "space-around",
      marginBottom: 4,
      backgroundColor: Colors.green10,
      paddingVertical: 12,
    },
    item: { flexDirection: "row", alignItems: "center", gap: 8 },
  },
  nutrientVerticalCard: {
    
  }
});

export default homeScreenStyles;
