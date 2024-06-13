import { NumberInput, View } from "react-native-ui-lib";

import GaugeIcon from "../icons/GaugeIcon";

import styles from "../../styles/styles";

export default function QuantityField({ initialNumber, onChangeNumber }) {
  return (
    <View style={styles.foodDetailsScreen.fieldViewStyle}>
      <View>
        <GaugeIcon width={24} height={24} />
      </View>
      <NumberInput
        initialNumber={initialNumber}
        onChangeNumber={onChangeNumber}
        containerStyle={styles.foodDetailsScreen.inputFieldStyle}
      />
    </View>
  );
}
