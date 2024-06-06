// External dependencies
import { Button, Colors, Dialog, Text, View } from "react-native-ui-lib";

// Components
import AlertTriangleIcon from "./icons/AlertTriangleIcon";

export default function AlertDialog({
  visibility,
  setVisibility,
  alertContent,
}) {
  function dismiss() {
    setVisibility(false);
  }

  return (
    <Dialog
      visible={visibility}
      onDismiss={dismiss}
      bottom
      containerStyle={{
        alignItems: "center",
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 10,
        gap: 5,
        marginBottom: 10,
        // height: 100,
      }}
    >
      <View width={30} height={30}>
        <AlertTriangleIcon color={Colors.green10} />
      </View>
      <Text text70BL color={Colors.green10}>
        ALERT
      </Text>
      <Text text70L center
      >{alertContent}</Text>
      <Button
        onPress={dismiss}
        style={{
          display: "flex",
          borderRadius: 5,
          backgroundColor: Colors.green10,
          marginVertical: 10,
        }}
      >
        <Text color={Colors.white}>I understand.</Text>
      </Button>
    </Dialog>
  );
}
