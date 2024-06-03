import { Button, Colors, Dialog, Text, View } from "react-native-ui-lib";
import AlertTriangleIcon from "./icons/AlertTriangleIcon";

export default function NutrientsDialog({
  visibility,
  setVisibility,
  expectedCalories,
  informedCalories,
  setAlertCalories,
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
        paddingHorizontal: 20,
        // height: 100,
      }}
    >
      <View width={30} height={30} style={{ marginTop: 10 }}>
        <AlertTriangleIcon color={Colors.green10} />
      </View>
      <Text text70BL color={Colors.green10}>
        ALERT
      </Text>
      <Text text70L center style={{ marginVertical: 10 }}>
        The amounts of nutrients and total calories do not seem to match.
      </Text>
      <Text text70L>
        Expected calories: ±{" "}
        <Text text70BL color={Colors.green10}>
          {expectedCalories}
        </Text>{" "}
        kcal
      </Text>
      <Text text70L>
        Informed calories:{" "}
        <Text text70BL color={Colors.green10}>
          {informedCalories}
        </Text>{" "}
        kcal
      </Text>
      <View style={{ flexDirection: "row", gap: 25, marginVertical: 16 }}>
        <Button
          onPress={() => {
            dismiss();
            setAlertCalories(false);
          }}
          style={{
            display: "flex",
            borderRadius: 5,
            backgroundColor: Colors.orange10,
          }}
        >
          <Text color={Colors.white}>Proceed anyway</Text>
        </Button>
        <Button
          onPress={dismiss}
          style={{
            display: "flex",
            borderRadius: 5,
            backgroundColor: Colors.green10,
          }}
        >
          <Text color={Colors.white}>Correct values</Text>
        </Button>
      </View>
    </Dialog>
  );
}
