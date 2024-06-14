// External dependencies
import { Button, Colors, Dialog, Text, View } from "react-native-ui-lib";

// Components
import AlertTriangleIcon from "./icons/AlertTriangleIcon";

// Stylesheets
import styles from "../styles/styles";

export default function ConfirmationDialog({
  content,
  visible,
  setVisible,
  onConfirm,
}) {
  //
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
      <AlertTriangleIcon width={30} height={30} color={Colors.red10} />
      <Text text70BL color={Colors.red10}>
        ALERT
      </Text>
      <View>
        {content.alertContent}
      </View>
      <View style={styles.dialogues.buttons.view}>
        <Button
          style={styles.dialogues.buttons.redCancel}
          onPress={dismissDialogue}
        >
          <Text white>Cancel</Text>
        </Button>
        <Button style={styles.dialogues.buttons.redConfirm} onPress={onConfirm}>
          <Text color={Colors.white}>{content.confirmText}</Text>
        </Button>
      </View>
    </Dialog>
  );
}
