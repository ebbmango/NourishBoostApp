// External dependencies
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Colors, Text, TouchableOpacity, View } from "react-native-ui-lib";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addDatabaseChangeListener, useSQLiteContext } from "expo-sqlite";

// Components
import FoodDetails from "../components/FoodDetails/FoodDetails";
import FoodOptionButton from "../components/FoodDetails/FoodOptionButton";

// Queries
import getFoodById from "../queries/getFoodById";
import getUnitsByFood from "../queries/getUnitsByFood";
import getNutrientsByFood from "../queries/getNutrientsByFood";
import createFoodEntry from "../queries/createFoodEntry";

// Stylesheets
import foodDetailsScreenStyles from "../styles/foodDetailsScreenStyles";

// Icons
import UtensilsIcon from "../components/icons/UtensilsIcon";

export default function FoodDetailsScreen() {
  const { date, foodId, mealId } = useRoute().params;
  const navigator = useNavigation();
  const database = useSQLiteContext();

  const { data: foodName = "", refetch: refetchFoodName } = useQuery(
    "foodName",
    () => getFoodById(database, { foodId }).name,
    { initialData: "" }
  );

  const {
    data: nutrientsArray,
    refetch: refetchNutrients,
    isSuccess: nutrientsLoaded,
  } = useQuery("nutrients", () => getNutrientsByFood(database, { foodId }));

  const {
    data: units,
    refetch: refetchUnits,
    isSuccess: unitsLoaded,
  } = useQuery("units", () => getUnitsByFood(database, { foodId }));

  const [selected, setSelected] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [unitsKey, setUnitsKey] = useState(Date.now());

  function refreshUnits() {
    setUnitsKey(Date.now());
  }

  useEffect(() => {
    const listener = addDatabaseChangeListener((change) => {
      if (change.tableName === "nutrients") {
        refetchNutrients();
        refetchUnits();
        setSelected((prev) => (prev === 0 ? 0 : prev - 1));
      }
      if (change.tableName === "foods") refetchFoodName();
    });

    return () => {
      listener.remove();
    };
  }, []);

  useEffect(() => {
    // This is to make sure the unit picker will display all units properly since the very start.
    refreshUnits();
    // And this to make sure the quantities will be properly displayed since the very start.
    if (nutrientsLoaded && nutrientsArray)
      setQuantity(nutrientsArray[selected].baseMeasure);
  }, [nutrientsLoaded, nutrientsArray]);

  useEffect(() => {
    if (nutrientsLoaded && nutrientsArray)
      // Now this to make sure the quantities will be properly displayed every time the user's selection changes
      setQuantity(nutrientsArray[selected].baseMeasure);
  }, [selected]);

  return nutrientsLoaded &&
    unitsLoaded &&
    nutrientsArray &&
    nutrientsArray[selected] &&
    nutrientsArray.length !== 0 ? (
    <>
      <FoodDetails
        food={{ id: foodId, name: foodName, nutritionalTables: nutrientsArray }}
        selectedTable={nutrientsArray[selected]}
        quantity={{ current: quantity, set: setQuantity }}
        unitPicker={{
          key: unitsKey,
          value: nutrientsArray[selected].unit.id,
          options: units,
          onChange: (value) => {
            setSelected(
              nutrientsArray.findIndex(
                (nutrients) => nutrients.unit.id === value
              )
            );
            refreshUnits();
          },
        }}
      />
      {/* Add to meal button */}
      <View style={foodDetailsScreenStyles.buttonsView}>
        <FoodOptionButton
          onPress={() => {
            createFoodEntry(database, {
              date,
              mealId,
              foodId,
              amount: quantity,
              unitId: nutrientsArray[selected].unit.id,
              nutrientsId: nutrientsArray[selected].id,
            });
            navigator.pop(2);
          }}
          color={Colors.green40}
          iconSource={() => (
            <UtensilsIcon
              width={28}
              height={28}
              style={{ marginRight: 1 }}
              color={Colors.white}
            />
          )}
        />
      </View>
    </>
  ) : (
    <></>
  );
}
