// External dependencies
import { Button, Colors, Dialog, Text, View } from "react-native-ui-lib";

// Components
import AlertTriangleIcon from "./icons/AlertTriangleIcon";

// Stylesheets
import styles from "../styles/styles";
import tweakStyles from "../functions/tweakStyles";
import PencilIcon from "./icons/PencilIcon";

export default function TextFieldDialogue({
  red,
  content,
  visible,
  setVisible,
  onConfirm,
}) {
  const color = red ? Colors.red10 : Colors.green10;

  const dismissDialogue = () => {
    setVisible(false);
  };

  return (
    <Dialog
      bottom
      visible={visible}
      containerStyle={styles.dialogues.container}
      onDismiss={dismissDialogue}
    >
      <PencilIcon width={30} height={30} color={color} />
      <Text text70BL color={color} style={{ marginBottom: 10 }}>
        NEW FOOD
      </Text>
      <View>{content.alertContent}</View>
      <View style={styles.dialogues.buttonsView}>
        <Button
          style={styles.dialogues.button[red ? "lightRed" : "lightGreen"]}
          onPress={dismissDialogue}
        >
          <Text white>{content.cancelText}</Text>
        </Button>
        <Button
          style={styles.dialogues.button[red ? "red" : "green"]}
          onPress={onConfirm}
        >
          <Text color={Colors.white}>{content.confirmText}</Text>
        </Button>
      </View>
    </Dialog>
  );
}
