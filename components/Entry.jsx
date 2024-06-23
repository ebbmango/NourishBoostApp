import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { Colors, Text, TouchableOpacity, View } from "react-native-ui-lib";
import AlertTriangleIcon from "./icons/AlertTriangleIcon";
import fixDecimals from "../functions/fixDecimals";
export default function Entry({ entry }) {
  const screenWidth = Dimensions.get("window").width;

  console.log(entry.unitId);

  const navigator = useNavigation();

  return (
    <TouchableOpacity
      row
      style={{ alignItems: "center", gap: 8 }}
      onPress={() => {
        navigator.navigate("Edit Entry", { entry });
      }}
    >
      <View
        style={{
          width: screenWidth * (entry.nutrients?.isDeleted ? 0.65 : 0.75),
          backgroundColor: Colors.green70,
          paddingHorizontal: 15,
          paddingVertical: 8,
          borderRadius: 100,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text text70>{entry.foodName}</Text>
        <Text text70>
          <Text text70BL>{fixDecimals(entry.kcals)}</Text> kcal
        </Text>
      </View>
      {entry.nutrients?.isDeleted && (
        <AlertTriangleIcon color={Colors.green10} width={24} height={24} />
      )}
    </TouchableOpacity>
  );
}
