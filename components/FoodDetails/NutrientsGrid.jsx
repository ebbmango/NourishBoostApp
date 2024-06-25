import { GridView, Colors, Text, View } from "react-native-ui-lib";
import styles from "../../styles/styles";
import React from "react";

export default function NutrientsGrid({ items }) {
  const renderCustomItem = ({ title, value, icon, trailing, color }) => {
    const ClonedIcon = React.cloneElement(icon, {
      style: {position: "absolute", right: 10},
      color: Colors.green50,
      width: 100,
      height: 100,
    });
    return (
      <View key={title} style={styles.foodDetailsScreen.nutrientsBoxStyle}>
        {ClonedIcon}
        <Text text70>{title}</Text>
        <Text text70BL>
          {value}
          {title !== "Calories" && "g"}
        </Text>
      </View>
    );
  };

  return (
    <GridView
      numColumns={2}
      items={items}
      renderCustomItem={renderCustomItem}
    />
  );
}
