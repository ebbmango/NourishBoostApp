import React from "react";
import { Colors, Text, View } from "react-native-ui-lib";
import homeScreenStyles from "../styles/homeScreenStyles";

export default function NutrientVerticalCard({ Icon, text }) {
  const IconComponent = React.cloneElement(Icon, {
    color: Colors.green10,
    width: 24,
    height: 24,
  });

  return (
    <View
      style={{
        // backgroundColor: Colors.green10,
        width: 48,
        gap: 4,
        paddingBottom: 6,
        paddingTop: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {IconComponent}
      <Text text80BL green10>
        {text}
      </Text>
    </View>
  );
}
