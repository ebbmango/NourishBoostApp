import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExportImportDataScreen from "../screens/ExportImportDataScreen";

const ExportStack = createNativeStackNavigator();

export default function ExportStackNavigator() {
  return (
    <ExportStack.Navigator>
      <ExportStack.Screen
        name="Export/Import"
        component={ExportImportDataScreen}
      />
    </ExportStack.Navigator>
  );
}
