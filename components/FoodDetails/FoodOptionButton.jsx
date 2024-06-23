import { Button, Colors } from "react-native-ui-lib";
import styles from "../../styles/styles";

export default function FoodOptionButton({ onPress, iconSource, color }) {
  return (
    <Button
      round
      backgroundColor={color ? color : Colors.grey50}
      style={styles.foodDetailsScreen.buttonStyle}
      iconSource={iconSource}
      onPress={onPress}
    />
  );
}
