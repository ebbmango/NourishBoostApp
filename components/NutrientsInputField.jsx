import { NumberInput, Text, View } from "react-native-ui-lib";
import styles from "../styles";

export default function NutrientsInputField({
  title,
  initialNumber,
  setNutrient,
}) {
  return (
    <View style={{ gap: 5 }}>
      <Text text70>{title}:</Text>
      <NumberInput
        initialNumber={initialNumber}
        onChangeNumber={(numberInput) => setNutrient(numberInput.number)}
        containerStyle={styles.foodDetailsScreen.nutrientsInputFieldStyle}
      />
    </View>
  );
}
