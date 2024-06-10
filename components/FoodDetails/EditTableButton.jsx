import { Button, Colors } from "react-native-ui-lib";
import styles from "../../styles";
import FileWriteIcon from "../icons/FileWriteIcon";
import { useNavigation } from "@react-navigation/native";

export default function EditTableButton({ onPress }) {
  return (
    <Button
      round
      backgroundColor={Colors.grey50}
      style={styles.foodDetailsScreen.buttonStyle}
      iconSource={() => {
        return (
          <FileWriteIcon
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
