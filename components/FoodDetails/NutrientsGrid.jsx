import { GridView, Text, View } from "react-native-ui-lib";
import styles from "../../styles";
import tweakStyles from "../../functions/tweakStyles";

export default function NutrientsGrid({ items }) {
  const renderCustomItem = ({ title, value, trailing, color }) => {
    return (
      <View
        key={title}
        style={tweakStyles(styles.foodDetailsScreen.nutrientsBoxStyle, {
          backgroundColor: color,
        })}
      >
        <Text text70>{title}</Text>
        <Text text70BL>
          {value}
          {trailing}
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
