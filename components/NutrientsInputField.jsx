import { NumberInput, Text, View } from "react-native-ui-lib";
import styles from "../styles";
import validateNumericField from "../functions/validateNumericField";

export default function NutrientsInputField({
  title,
  initialNumber,
  setters: { nutrient: setNutrient, validity: setValidity },
}) {
  return (
    <View style={{ gap: 5 }}>
      <Text text70>{title}:</Text>
      <NumberInput
        initialNumber={initialNumber}
        onChangeNumber={(numberInput) => {
          const number = numberInput.number;
          const validity = validateNumericField(number);
          setNutrient(number);
          setValidity(validity);
        }}
        containerStyle={styles.foodDetailsScreen.nutrientsInputFieldStyle}
      />
    </View>
  );
}