import { Button, Colors } from "react-native-ui-lib";
import styles from "../../styles";
import FilePlusIcon from "../icons/FilePlusIcon";

export default function CreateTableButton({ onPress }) {
  return (
    <Button
      round
      backgroundColor={Colors.grey50}
      style={styles.foodDetailsScreen.buttonStyle}
      iconSource={() => {
        return (
          <FilePlusIcon
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
