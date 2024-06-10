import { Button, Colors } from "react-native-ui-lib";
import styles from "../../styles";
import TrashIcon from "../icons/TrashIcon";

export default function DeleteFoodButton({ onPress }) {
  return (
    <Button
      round
      backgroundColor={Colors.grey50}
      style={styles.foodDetailsScreen.buttonStyle}
      iconSource={() => {
        return <TrashIcon color={Colors.white} width={25} height={25} />;
      }}
      onPress={onPress}
    />
  );
}
