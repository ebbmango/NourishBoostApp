import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { Colors, Text, TouchableOpacity, View } from "react-native-ui-lib";
export default function Entry({ entry }) {
  const screenWidth = Dimensions.get("window").width;

  const navigator = useNavigation();

  return (
    <TouchableOpacity
      style={{
        width: screenWidth * 0.75,
        backgroundColor: Colors.green70,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 100,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      onPress={() => {
        navigator.navigate("Edit Entry", { entry });
      }}
    >
      <Text text70>{entry.foodName}</Text>
      <Text text70>
        <Text text70BL>{entry.kcals}</Text> kcal
      </Text>
    </TouchableOpacity>
  );
}
