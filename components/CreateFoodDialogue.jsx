// External dependencies
import {
  Button,
  Colors,
  Dialog,
  Text,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";

// Components
import AlertTriangleIcon from "./icons/AlertTriangleIcon";

// Stylesheets
import styles from "../styles/styles";
import tweakStyles from "../functions/tweakStyles";
import PencilIcon from "./icons/PencilIcon";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Pressable } from "react-native";
import DuotonePanIcon from "./icons/DuotonePanIcon";
import DuotoneChefIcon from "./icons/DuotoneChefIcon";
import DuotoneBowlChopsticksIcon from "./icons/DuotoneBowlChopsticksIcon";
import DuotoneEggIcon from "./icons/DuotoneEggIcon";

export default function CreateFoodDialogue({
  red,
  content,
  visible,
  setVisible,
  onConfirm,
  type,
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

      <View row style={{ marginTop: 10, gap: 16 }}>
        <Pressable
          onPress={() => {
            type.set("food");
          }}
        >
          <View
            center
            style={{
              width: 120,
              height: 180,
              backgroundColor:
                type.selected === "food" ? Colors.green20 : Colors.green50,
              borderRadius: 5,
            }}
          >
            <View
              // "Food" Card
              center
              style={{
                overflow: "hidden",
                padding: 0,
                width: 110,
                height: 170,
                borderWidth: 1,
                borderColor: Colors.white,
                borderRadius: 3,
                borderRadius: 3,
              }}
            >
              <DuotoneEggIcon
                style={{
                  position: "absolute",
                  right: 29,
                  top: 3,
                  transform: [{ rotate: "235deg" }],
                }}
                width={60}
                height={60}
                // yolk
                primary={
                  type.selected === "food" ? Colors.green40 : Colors.green60
                }
                // white
                secondary={Colors.green80}
              />
              <Text
                text60
                white
                // style={{ marginBottom: 8 }}
              >
                Food
              </Text>
              <DuotoneBowlChopsticksIcon
                style={{ position: "absolute", bottom: -16 }}
                width={60}
                height={60}
                // bowl
                primary={Colors.green80}
                // chopsticks
                secondary={
                  type.selected === "food" ? Colors.green40 : Colors.green60
                }
              />
            </View>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            type.set("recipe");
          }}
        >
          <View
            center
            style={{
              width: 120,
              height: 180,
              backgroundColor:
                type.selected === "recipe" ? Colors.green20 : Colors.green50,
              borderRadius: 5,
            }}
          >
            <View
              // "Recipe" Card
              center
              style={{
                overflow: "hidden",
                padding: 0,
                width: 110,
                height: 170,
                borderWidth: 1,
                borderColor: Colors.white,
                borderRadius: 3,
                borderRadius: 3,
              }}
            >
              <DuotonePanIcon
                style={{
                  position: "absolute",
                  top: 8,
                }}
                width={60}
                height={60}
                primary={Colors.green80}
                secondary={
                  type.selected === "recipe" ? Colors.green40 : Colors.green60
                }
              />
              <Text text60 white>
                Recipe
              </Text>
              <DuotoneChefIcon
                style={{ position: "absolute", bottom: 0 }}
                width={60}
                height={60}
                // clothes
                primary={Colors.green80}
                // face
                secondary={
                  type.selected === "recipe" ? Colors.green40 : Colors.green60
                }
              />
            </View>
          </View>
        </Pressable>
      </View>

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
