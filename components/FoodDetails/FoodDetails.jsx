// External dependencies
import { Text, View } from "react-native-ui-lib";

// Stylesheets
import QuantityField from "./QuantityField";
import UnitPicker from "./UnitPicker";
import NutrientsGrid from "./NutrientsGrid";
import styles from "../../styles";

export default function FoodDetails({
  foodName,
  numberField,
  unitPicker,
  nutrientsGrid,
}) {
  return (
    <>
      <View>
        <Text text30 style={styles.foodDetailsScreen.foodNameStyle}>
          {foodName}
        </Text>
        {/* Field that changes the amount of food */}
        <QuantityField
          initialNumber={numberField.initialNumber}
          onChangeNumber={numberField.onChangeNumber}
        />
        {/* Field that changes the currently selected measurement unit */}
        <UnitPicker
          value={unitPicker.initialValue}
          options={unitPicker.options}
          onChange={unitPicker.onChange}
        />
        {/* Macronutrients grid */}
        <NutrientsGrid items={nutrientsGrid.items} />
      </View>
    </>
  );
}
