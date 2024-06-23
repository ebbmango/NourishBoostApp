import React from "react";
import { Colors, Text, View } from "react-native-ui-lib";
import homeScreenStyles from "../styles/homeScreenStyles";

export default function NutrientOverview({ Icon, text }) {
  const IconComponent = React.cloneElement(Icon, {
    color: Colors.green70,
    width: 24,
    height: 24,
  });

  return (
    <View style={homeScreenStyles.macrosOverview.item}>
      {IconComponent}
      <Text text70BL green70>
        {text}
      </Text>
    </View>
  );
}
