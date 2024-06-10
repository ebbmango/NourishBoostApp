import { NumberInput, Picker, View } from "react-native-ui-lib";

import RulerVerticalIcon from "../icons/RulerVerticalIcon";

import styles from "../../styles";

export default function UnitPicker({ value, onChange, options }) {
  return (
    <View style={styles.foodDetailsScreen.fieldViewStyle}>
      <View>
        <RulerVerticalIcon width={24} height={24} />
      </View>
      <Picker value={""} style={styles.foodDetailsScreen.inputFieldStyle}>
        {/* map the available options here */}
      </Picker>
    </View>
  );
}
