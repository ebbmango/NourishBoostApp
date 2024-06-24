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

// Stylesheets
import foodDetailsScreenStyles from "../styles/foodDetailsScreenStyles";

// Icons
import UtensilsIcon from "../components/icons/UtensilsIcon";
import PenIcon from "../components/icons/PenIcon";
import updateEntry from "../queries/updateEntry";
import TrashIcon from "../components/icons/TrashIcon";
import deleteEntry from "../queries/deleteEntry";

export default function FoodDetailsScreen() {
  const {
    entry: { unitId, foodId, id: entryId, amount },
  } = useRoute().params;

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
  const [quantity, setQuantity] = useState(amount);
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
    if (nutrientsLoaded && nutrientsArray) setQuantity(amount);
  }, [nutrientsLoaded, nutrientsArray]);

  return nutrientsLoaded && unitsLoaded ? (
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
      {/* Delete entry button */}
      <View row style={foodDetailsScreenStyles.buttonsView}>
        <FoodOptionButton
          onPress={() => {
            deleteEntry(database, { entryId });
            navigator.pop();
          }}
          color={Colors.red40}
          iconSource={() => (
            <TrashIcon
              width={24}
              height={24}
              style={{ marginRight: 1 }}
              color={Colors.white}
            />
          )}
        />
        {/* Edit Entry button */}
        <FoodOptionButton
          onPress={() => {
            updateEntry(database, {
              unitId,
              amount: quantity,
              entryId,
              nutrientsId: nutrientsArray[selected].id,
            });
            navigator.pop();
          }}
          color={Colors.green40}
          iconSource={() => (
            <PenIcon
              width={22}
              height={22}
              style={{ marginLeft: 1 }}
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
