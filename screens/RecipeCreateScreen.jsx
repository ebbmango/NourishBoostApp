import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import getAllUnits from "../queries/getAllUnits";
import { useSQLiteContext } from "expo-sqlite";
import {
  Button,
  Colors,
  Dialog,
  NumberInput,
  Text,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";
import QuantityField from "../components/FoodDetails/QuantityField";
import UnitPicker from "../components/FoodDetails/UnitPicker";
import NutrientsGrid from "../components/FoodDetails/NutrientsGrid";
import { ScrollView } from "react-native-gesture-handler";
import PlusIcon from "../components/icons/PlusIcon";
import { Dimensions } from "react-native";
import CircleCheckIcon from "../components/icons/CircleCheckIcon";
import FoodOverview from "../components/FoodOverview";
import getAllFoodsWithNutrients from "../queries/getAllFoodsWithNutrients";
import proportion from "../functions/proportion";
import getNutrientsById from "../queries/getNutrientsById";
import fixDecimals from "../functions/fixDecimals";
import XMarkCircleIcon from "../components/icons/XMarkCircleIcon";
import AlertDialogue from "../components/AlertDialogue";
import createRecipe from "../queries/createRecipe";
import createNutrients from "../queries/createNutrients";
import createIngredient from "../queries/createIngredient";

export default function RecipeCreateScreen() {
  const navigator = useNavigation();

  const { recipeName } = useRoute().params;

  const database = useSQLiteContext();

  const foods = getAllFoodsWithNutrients(database);

  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  const measurementUnits = getAllUnits(database);

  const [ingredientsSeries, setIngredientsSeries] = useState(0);

  const [fats, setFats] = useState(0);
  const [kcals, setKcals] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [protein, setProtein] = useState(0);
  const [baseMeasure, setBaseMeasure] = useState(0);

  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [selectedTableId, setSelectedTableId] = useState(null);

  const [quantity, setQuantity] = useState(0);

  const [unitId, setUnitId] = useState(1);
  const [show, setShow] = useState(false);

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    setFats(ingredients.reduce((acc, val) => acc + val.fats, 0));
    setKcals(ingredients.reduce((acc, val) => acc + val.kcals, 0));
    setCarbs(ingredients.reduce((acc, val) => acc + val.carbs, 0));
    setProtein(ingredients.reduce((acc, val) => acc + val.protein, 0));
  }, [ingredients]);

  const [showMeasureAlert, setShowMeasureAlert] = useState(false);
  const [showIngredientsAlert, setShowIngredientsAlert] = useState(false);
  const [showIngredientAlert, setShowIngredientAlert] = useState(false);

  return (
    <>
      <AlertDialogue
        visible={showIngredientAlert}
        setVisible={setShowIngredientAlert}
        content={{
          confirmText: "I understand.",
          alertContent: <Text text70>No ingredient has been selected!</Text>,
        }}
      />
      <AlertDialogue
        visible={showIngredientsAlert}
        setVisible={setShowIngredientsAlert}
        content={{
          confirmText: "I understand.",
          alertContent: <Text text70>No ingredients have been selected!</Text>,
        }}
      />
      {/* Base measure validity alert */}
      <AlertDialogue
        visible={showMeasureAlert}
        setVisible={setShowMeasureAlert}
        content={{
          confirmText: "I understand.",
          alertContent: (
            <Text text70>
              {baseMeasure === 0
                ? "The base measure cannot be zero!"
                : "The base measure cannot be negative!"}
            </Text>
          ),
        }}
      />
      <Dialog
        visible={show}
        bottom
        onDismiss={() => {
          setSelectedFoodId(null);
          setSelectedTableId(null);
          setQuantity(0);
          setShow(false);
        }}
        containerStyle={{
          width: "100%",
          height: screenHeight * 0.8,
          backgroundColor: Colors.white,
          borderTopEndRadius: 12,
          borderTopStartRadius: 12,
          paddingBottom: 10,
        }}
      >
        <ScrollView
          style={{
            margin: 10,
            // backgroundColor: Colors.green50,
          }}
          contentContainerStyle={{
            alignItems: "center",
            gap: 12,
          }}
        >
          {foods.map((food) => (
            <FoodOverview
              key={food.id}
              selectedTableId={{
                current: selectedTableId,
                set: setSelectedTableId,
              }}
              selectedFoodId={{
                current: selectedFoodId,
                set: setSelectedFoodId,
              }}
              food={{ name: food.name, id: food.id }}
              nutritionalTables={food.tables}
              amount={quantity}
            />
          ))}
        </ScrollView>
        <View spread row style={{ width: "100%", paddingHorizontal: 20 }}>
          <NumberInput
            onChangeNumber={(numberInput) => setQuantity(numberInput.number)}
            containerStyle={{
              width: screenWidth * 0.67,
              height: 36,
              backgroundColor: Colors.grey60,
              borderRadius: 5,
              paddingHorizontal: 10,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          />
          <TouchableOpacity
            onPress={() => {
              if (selectedFoodId) {
                setIngredientsSeries((val) => val + 1);

                const table = getNutrientsById(database, {
                  nutrientsId: selectedTableId,
                });

                const newIngredients = ingredients.concat([
                  {
                    id: ingredientsSeries,
                    unit: table.unit,
                    food: {
                      id: selectedFoodId,
                      name: foods.find((food) => food.id === selectedFoodId)
                        .name,
                    },
                    nutrientsId: selectedTableId,
                    amount: quantity,
                    kcals: proportion(table.kcals, quantity, table.baseMeasure),
                    protein: proportion(
                      table.protein,
                      quantity,
                      table.baseMeasure
                    ),
                    carbs: proportion(table.carbs, quantity, table.baseMeasure),
                    fats: proportion(table.fats, quantity, table.baseMeasure),
                  },
                ]);

                setIngredients(newIngredients);

                setShow(false);
                setSelectedFoodId(null);
                setSelectedTableId(null);
                setQuantity(0);
              } else {
                setShowIngredientAlert(true);
              }
            }}
          >
            <CircleCheckIcon
              primaryColor={Colors.white}
              secondaryColor={Colors.green30}
              width={36}
              height={36}
            />
          </TouchableOpacity>
        </View>
      </Dialog>
      <Text
        text30
        center
        style={{
          marginVertical: 20,
          color: Colors.black,
        }}
      >
        {recipeName}
      </Text>
      {/* Field that changes the amount of food */}
      <QuantityField
        initialNumber={baseMeasure}
        onChangeNumber={(numberInput) => setBaseMeasure(numberInput.number)}
      />
      <UnitPicker
        value={unitId}
        options={measurementUnits}
        onChange={(value) => setUnitId(value)}
      />
      <NutrientsGrid
        items={[
          {
            title: "Calories",
            value: fixDecimals(kcals),
          },
          {
            title: "Carbohydrates",
            value: fixDecimals(carbs),
          },
          {
            title: "Fats",
            value: fixDecimals(fats),
          },
          {
            title: "Protein",
            value: fixDecimals(protein),
          },
        ]}
      />
      <ScrollView
        style={{
          margin: 10,
        }}
        contentContainerStyle={{
          alignItems: "center",
          gap: 10,
          paddingHorizontal: 10,
        }}
      >
        {ingredients.map((ingredient) => (
          <View
            spread
            key={ingredient.id}
            style={{
              flexDirection: "row",
              width: "100%",
              // height: 50,
              borderRadius: 10,
              backgroundColor: Colors.grey50,
              padding: 12,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", top: -8, right: -8 }}
              onPress={() => {
                const newIgredients = ingredients.filter(
                  (element) => element.id !== ingredient.id
                );
                setIngredients(newIgredients);
              }}
            >
              <XMarkCircleIcon
                width={24}
                height={24}
                primaryColor={Colors.white}
                secondaryColor={Colors.green20}
              />
            </TouchableOpacity>
            <View center>
              <Text text70>{ingredient.food.name}</Text>
              <Text>
                {ingredient.amount}
                {ingredient.unit.symbol}
              </Text>
            </View>
            <View row style={{ gap: 24 }}>
              <View style={{ gap: 8, alignItems: "flex-end" }}>
                <Text>Calories: {fixDecimals(ingredient.kcals)}</Text>
                <Text>Fats: {fixDecimals(ingredient.fats)}</Text>
              </View>
              <View style={{ gap: 8, alignItems: "flex-end" }}>
                <Text>Protein: {fixDecimals(ingredient.protein)}</Text>
                <Text>Carbohydrates: {fixDecimals(ingredient.carbs)}</Text>
              </View>
            </View>
          </View>
        ))}
        <View center style={{ marginTop: 10, gap: 8 }}>
          <Button
            backgroundColor={Colors.green70}
            style={{ padding: 9, width: 44, height: 44 }}
            iconSource={() => (
              <PlusIcon
                style={{ width: 16, height: 16 }}
                color={Colors.green10}
              />
            )}
            round
            onPress={() => {
              setShow(true);
            }}
          />
          {ingredients.length === 0 && (
            <Text text70 grey40>
              New ingredient
            </Text>
          )}
        </View>
      </ScrollView>
      <View center style={{ width: "100%", marginBottom: 16 }}>
        <Button
          label={"Create recipe"}
          style={{
            width: 200,
            backgroundColor: Colors.green20,
            borderRadius: 10,
          }}
          onPress={() => {
            if (ingredients.length === 0) {
              setShowIngredientsAlert(true);
            } else if (baseMeasure <= 0) {
              setShowMeasureAlert(true);
            } else {
              // console.log(
              //   // recipeId,
              //   unitId,
              //   quantity,
              //   kcals,
              //   protein,
              //   carbs,
              //   fats
              // );

              // We create the recipe.
              const recipeId = createRecipe(database, {
                recipeName,
              });

              // console.log(recipeId);

              // We create its nutritional table.
              createNutrients(database, {
                foodId: recipeId,
                unitId,
                baseMeasure,
                kcals,
                protein,
                carbs,
                fats,
              });

              // console.log(quantity)

              // console.log(getNutrientsById(database, { nutrientsId: 6 }));

              // console.log("nutri");
              // console.log(nutri);

              // We create its ingredients
              ingredients.forEach((ingredient) => {
                createIngredient(database, {
                  recipeId,
                  nutrientsId: ingredient.food.id,
                  amount: ingredient.amount,
                });
              });

              navigator.pop();
            }
          }}
        />
      </View>
    </>
  );
}
