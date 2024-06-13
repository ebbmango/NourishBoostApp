import { GridView, Text, View } from "react-native-ui-lib";
import styles from "../../styles/styles";
import tweakStyles from "../../functions/tweakStyles";

export default function NutrientsGrid({ items }) {
  const renderCustomItem = ({ title, value, trailing, color }) => {
    return (
      <View key={title} style={styles.foodDetailsScreen.nutrientsBoxStyle}>
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
