import { Button, Colors } from "react-native-ui-lib";
import styles from "../../styles/styles";
import FileDeleteIcon from "../icons/FileDeleteIcon";

export default function DeleteTableButton({ onPress }) {
  return (
    <Button
      round
      backgroundColor={Colors.grey50}
      style={styles.foodDetailsScreen.buttonStyle}
      iconSource={() => {
        return (
          <FileDeleteIcon
            color={Colors.white}
            width={28}
            height={28}
            style={{ marginLeft: 6 }}
          />
        );
      }}
      onPress={onPress}
    />
  );
}
