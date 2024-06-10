import { NumberInput, View } from "react-native-ui-lib";

import GaugeIcon from "../icons/GaugeIcon";

import styles from "../../styles";

export default function QuantityField({ initialNumber, onChangeNumber }) {
  return (
    <View style={styles.foodDetailsScreen.fieldViewStyle}>
      <View>
        <GaugeIcon width={24} height={24} />
      </View>
      <NumberInput
        initialNumber={0}
        onChangeNumber={(numberInput) => {
          // code here
        }}
        containerStyle={styles.foodDetailsScreen.inputFieldStyle}
      />
    </View>
  );
}
