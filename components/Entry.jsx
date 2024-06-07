import { Dimensions } from "react-native";
import { Colors, Text, View } from "react-native-ui-lib";
export default function Entry({ name, kcals }) {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View
      style={{
        width: screenWidth * 0.7,
        backgroundColor: Colors.green70,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text text70>{name}</Text>
      <Text text70>
        <Text text70BL>{kcals}</Text> kcal
      </Text>
    </View>
  );
}
