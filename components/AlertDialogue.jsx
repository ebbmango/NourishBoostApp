// External dependencies
import { Button, Colors, Dialog, Text, View } from "react-native-ui-lib";

// Components
import AlertTriangleIcon from "./icons/AlertTriangleIcon";

// Stylesheets
import styles from "../styles/styles";

export default function AlertDialogue({ visible, setVisible, content}) {
  
  const dismissDialogue = () => {
    setVisible(false);
  };

  return (
    <Dialog
      visible={visible}
      onDismiss={dismissDialogue}
      bottom
      containerStyle={styles.dialogues.container}
    >
      <AlertTriangleIcon width={30} height={30} color={Colors.green10} />
      <Text text70BL color={Colors.green10}>
        ALERT
      </Text>
      <View>{content.alertContent}</View>
      <Button
        onPress={dismissDialogue}
        color={Colors.green10}
        style={styles.dialogues.button.green}
      >
        <Text color={Colors.white}>{content.confirmText}</Text>
      </Button>
    </Dialog>
  );
}
