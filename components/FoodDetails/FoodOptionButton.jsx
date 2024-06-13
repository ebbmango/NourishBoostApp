import { Button, Colors } from "react-native-ui-lib";
import styles from "../../styles/styles";

export default function FoodOptionButton({ onPress, iconSource }) {
  return (
    <Button
      round
      backgroundColor={Colors.grey50}
      style={styles.foodDetailsScreen.buttonStyle}
      iconSource={iconSource}
      onPress={onPress}
    />
  );
}
