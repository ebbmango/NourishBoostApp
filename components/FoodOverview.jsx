import WheelPicker from "react-native-wheely";
import {
  Button,
  Colors,
  Dialog,
  NumberInput,
  Text,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";

import CircleCheckIcon from "../components/icons/CircleCheckIcon";
import WheatIcon from "../components/icons/WheatIcon";
import NutrientVerticalCard from "../components/NutrientVerticalCard";
import BaconIcon from "../components/icons/BaconIcon";
import DrumstickIcon from "../components/icons/DrumstickIcon";
import CaloriesIcon from "../components/icons/CaloriesIcon";
import ScaleIcon from "../components/icons/ScaleIcon";
import { useEffect, useState } from "react";
import proportion from "../functions/proportion";
import fixDecimals from "../functions/fixDecimals";

export default function FoodOverview({
  selectedFoodId,
  selectedTableId,
  food,
  nutritionalTables,
  amount,
}) {
  const units = nutritionalTables.map((table) => table.unit.symbol);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedTable, setSelectedTable] = useState(nutritionalTables[0]);

  const [fats, setFats] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [kcals, setKcals] = useState(0);
  const [protein, setProtein] = useState(0);

  useEffect(() => {
    setFats(proportion(selectedTable.fats, amount, selectedTable.base));
    setCarbs(proportion(selectedTable.carbs, amount, selectedTable.base));
    setKcals(proportion(selectedTable.kcals, amount, selectedTable.base));
    setProtein(proportion(selectedTable.protein, amount, selectedTable.base));
  }, [amount, selectedTable]);

  return (
    <View style={{ margin: 5 }}>
      {selectedFoodId.current === food.id && (
        <CircleCheckIcon
          style={{ position: "absolute", zIndex: 1, bottom: -5, right: -5 }}
          width={24}
          height={24}
          primaryColor={Colors.white}
          secondaryColor={Colors.yellow20}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          selectedFoodId.set(food.id);
          selectedTableId.set(selectedTable.id);
        }}
      >
        <View
          style={{
            backgroundColor: Colors.green30,
            borderTopEndRadius: 10,
            borderTopStartRadius: 10,
            padding: 2,
          }}
        >
          <Text center white style={{ fontSize: 18 }}>
            {food.name}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        spread
        row
        style={{
          width: "100%",
          backgroundColor: Colors.green60,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          paddingLeft: 4,
        }}
      >
        <NutrientVerticalCard
          Icon={<WheatIcon />}
          text={fixDecimals(carbs) + "g"}
        />
        <NutrientVerticalCard
          Icon={<BaconIcon />}
          text={fixDecimals(fats) + "g"}
        />
        <NutrientVerticalCard
          Icon={<DrumstickIcon />}
          text={fixDecimals(protein) + "g"}
        />
        <NutrientVerticalCard
          Icon={<CaloriesIcon />}
          text={fixDecimals(kcals)}
        />
        <View
          row
          center
          style={{
            gap: 12,
            padding: 8,
            paddingLeft: 12,
            backgroundColor: Colors.green10,
            //   borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          {/* <ScaleIcon width={24} height={24} color={Colors.green60} /> */}
          <WheelPicker
            containerStyle={{
              height: 48,
              width: 64,
            }}
            itemHeight={48}
            visibleRest={0}
            selectedIndex={selectedIndex}
            decelerationRate={"fast"}
            selectedIndicatorStyle={{ backgroundColor: Colors.green20 }}
            options={units}
            rotationFunction={(x) => x}
            onChange={(index) => {
              setSelectedIndex(index);
              const unitSymbol = units[index];
              const newTable = nutritionalTables.find(
                (table) => table.unit.symbol === unitSymbol
              );
              setSelectedTable(newTable);

              if (selectedFoodId.current === food.id) {
                selectedTableId.set(newTable.id);
              }
            }}
            itemStyle={{
              backgroundColor: Colors.white,
              borderRadius: 10,
            }}
            itemTextStyle={{
              fontSize: 16,
              color: Colors.green10,
              fontWeight: "bold",
            }}
          />
        </View>
      </View>
    </View>
  );
}
