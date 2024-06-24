import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { Colors, Text, TouchableOpacity, View } from "react-native-ui-lib";
import AlertTriangleIcon from "./icons/AlertTriangleIcon";
import fixDecimals from "../functions/fixDecimals";
import getNutrientsById from "../queries/getNutrientsById";
import ConfirmationDialogue from "./ConfirmationDialogue";
import { useState } from "react";
import deleteEntry from "../queries/deleteEntry";
import { useSQLiteContext } from "expo-sqlite";
export default function Entry({ entry }) {
  const screenWidth = Dimensions.get("window").width;

  const database = useSQLiteContext();

  const navigator = useNavigation();

  const [show, setShow] = useState(false);

  return (
    <>
      <ConfirmationDialogue
        visible={show}
        setVisible={setShow}
        onConfirm={() => {
          deleteEntry(database, { entryId: entry.id });
        }}
        content={{
          alertContent: (
            <Text center text70>
              <Text text70BL>This entry can no longer be edited.</Text>
              {"\n"}
              Food or nutritional table has been deleted.
            </Text>
          ),
          cancelText: "Cancel",
          confirmText: "Delete entry",
        }}
      />
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
        onPress={
          entry.nutrients.isDeleted === 0
            ? () => {
                navigator.navigate("Edit Entry", { entry });
              }
            : () => {
                setShow(true);
              }
        }
      >
        <View
          style={{
            width:
              screenWidth * (entry.nutrients.isDeleted === 1 ? 0.65 : 0.75),
            backgroundColor: Colors.green70,
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderRadius: 100,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text text70>{entry.foodName}</Text>
          <Text text70>
            <Text text70BL>{fixDecimals(entry.kcals)}</Text> kcal
          </Text>
        </View>
        {entry.nutrients.isDeleted === 1 && (
          <AlertTriangleIcon color={Colors.green10} width={24} height={24} />
        )}
      </TouchableOpacity>
    </>
  );
}
