import { GridView, Text, View } from "react-native-ui-lib";
import styles from "../../styles";

export default function NutrientsGrid({ items }) {
  const renderCustomItem = ({ title, value, trailing }) => {
    return (
      <View key={title} style={styles.foodDetailsScreen.nutrientsBoxStyle}>
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
