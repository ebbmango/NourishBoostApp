import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WeightScreen from "../screens/WeightScreen";

const WeightStack = createNativeStackNavigator();

export default function WeightStackNavigator() {
  return (
    <WeightStack.Navigator>
      <WeightStack.Screen name="Weight Tracker" component={WeightScreen} />
    </WeightStack.Navigator>
  );
}
