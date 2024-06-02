import { useRef, useState } from "react";

import { addDatabaseChangeListener, useSQLiteContext } from "expo-sqlite/next";
import { Dimensions } from "react-native";

import {
  Button,
  Colors,
  GridView,
  NumberInput,
  Picker,
  Text,
  TextField,
  View,
} from "react-native-ui-lib";

import GaugeIcon from "../components/icons/GaugeIcon";
import RulerVerticalIcon from "../components/icons/RulerVerticalIcon";
import EditIcon from "../components/icons/EditIcon";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import PencilIcon from "../components/icons/PencilIcon";
import validateString from "../functions/validateString";
import EmptyNameDialog from "../components/EmptyNameDialog";

export default function FoodCreateScreen() {
  const navigator = useNavigation();
  // Retrieving the database.
  const database = useSQLiteContext();
  const screenWidth = Dimensions.get("window").width;

  const measurementUnits = database.getAllSync("SELECT * FROM units;");

  // DATA:

  const [foodName, setFoodName] = useState("");

  const [nameValidity, setNameValidity] = useState(false);
  const [unit, setUnit] = useState(measurementUnits[0].unit);

  const [measureValidity, setMeasureValidity] = useState(false);
  const [baseMeasure, setBaseMeasure] = useState(0);

  const [nutritionValidity, setNutritionValidity] = useState(false);
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);
  const [protein, setProtein] = useState(0);

  // REF

  const scrollViewRef = useRef(null);

  const [nameAlertVisibility, setNameAlertVisibility] = useState(false);

  return (
    <>
      <EmptyNameDialog
        visibility={nameAlertVisibility}
        setVisibility={setNameAlertVisibility}
      />
      <ScrollView ref={scrollViewRef}>
        <Text
          text30
          style={{
            marginLeft: 16,
            marginVertical: 20,
            color: foodName.length === 0 ? Colors.grey40 : Colors.black,
          }}
        >
          {foodName.length === 0 ? "New food" : foodName}
        </Text>
        {/* Field that changes the food's name */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
            marginLeft: 16,
          }}
        >
          <View width={24} height={24}>
            <PencilIcon />
          </View>
          <TextField
            placeholder={"Enter the food name here."}
            onChangeText={(text) => {
              setFoodName(text);
            }}
            containerStyle={{
              width: screenWidth - 64,
              height: 36,
              backgroundColor: Colors.grey60,
              borderRadius: 5,
              paddingHorizontal: 10,
              justifyContent: "center",
            }}
          />
        </View>
        {/* Field that changes the amount of food */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
            marginLeft: 16,
          }}
        >
          <View width={24} height={24} style={{ marginTop: 12 }}>
            <GaugeIcon />
          </View>
          <NumberInput
            initialNumber={baseMeasure}
            onChangeNumber={(numberInput) => {
              setBaseMeasure(numberInput.number);
            }}
            containerStyle={{
              width: screenWidth - 64,
              height: 36,
              backgroundColor: Colors.grey60,
              borderRadius: 5,
              paddingHorizontal: 10,
              marginTop: 12,
              alignItems: "center",
            }}
          />
        </View>
        {/* Field that changes the currently selected measurement unit */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
            marginTop: 12,
            marginLeft: 16,
          }}
        >
          <View width={24} height={24} style={{ marginBottom: 2 }}>
            <RulerVerticalIcon />
          </View>
          <Picker
            value={unit}
            onChange={(element) => {
              setUnit(element);
            }}
            style={{
              width: screenWidth - 64,
              height: 36,
              backgroundColor: Colors.grey60,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
          >
            {measurementUnits.map((unitObject) => (
              <Picker.Item
                key={unitObject.id}
                value={unitObject.unit}
                label={unitObject.unit}
              />
            ))}
          </Picker>
        </View>
        {/* Macronutrients grid */}
        <GridView
          numColumns={2}
          items={[
            {
              title: "Calories",
              value: calories,
              macro: false,
            },
            {
              title: "Carbohydrates",
              value: carbs,
              macro: true,
            },
            {
              title: "Fats",
              value: fats,
              macro: true,
            },
            {
              title: "Protein",
              value: protein,
              macro: true,
            },
          ]}
          renderCustomItem={({ title, value, macro }) => {
            return (
              <View
                key={title}
                style={{
                  width: screenWidth / 2 - 15, // Adjust the width for padding/margin
                  padding: 10,
                  justifyContent: "center",
                  backgroundColor: Colors.green30,
                  borderRadius: 5,
                  marginLeft: 10,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <Text text70>{title}</Text>
                <Text text70BL>
                  {value}
                  {macro && "g"}
                </Text>
              </View>
            );
          }}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            gap: 10,
          }}
        >
          {/* Calories input */}
          <View style={{ gap: 5 }}>
            <Text text70>Calories:</Text>
            <NumberInput
              initialNumber={calories}
              onChangeNumber={(numberInput) => {
                setCalories(numberInput.number);
              }}
              containerStyle={{
                width: screenWidth - 20,
                height: 36,
                backgroundColor: Colors.grey50,
                borderRadius: 5,
                paddingHorizontal: 10,
                alignItems: "center",
              }}
            />
          </View>
          {/* Carbohydrates input */}
          <View style={{ gap: 5 }}>
            <Text text70>Carbohydrates:</Text>
            <NumberInput
              initialNumber={carbs}
              onChangeNumber={(numberInput) => {
                setCarbs(numberInput.number);
              }}
              containerStyle={{
                width: screenWidth - 20,
                height: 36,
                backgroundColor: Colors.grey50,
                borderRadius: 5,
                paddingHorizontal: 10,
                alignItems: "center",
              }}
            />
          </View>
          {/* Fats input */}
          <View style={{ gap: 5 }}>
            <Text text70>Fats:</Text>
            <NumberInput
              initialNumber={fats}
              onChangeNumber={(numberInput) => {
                setFats(numberInput.number);
              }}
              containerStyle={{
                width: screenWidth - 20,
                height: 36,
                backgroundColor: Colors.grey50,
                borderRadius: 5,
                paddingHorizontal: 10,
                alignItems: "center",
              }}
            />
          </View>
          {/* Protein input */}
          <View style={{ gap: 5 }}>
            <Text text70>Protein:</Text>
            <NumberInput
              initialNumber={protein}
              onChangeNumber={(numberInput) => {
                setProtein(numberInput.number);
              }}
              containerStyle={{
                width: screenWidth - 20,
                height: 36,
                backgroundColor: Colors.grey50,
                borderRadius: 5,
                paddingHorizontal: 10,
                alignItems: "center",
              }}
            />
          </View>
          {/* Confirm button */}
          <Button
            label="Register food item"
            iconSource={() => {
              return (
                <View width={20} height={20} style={{ marginRight: 6 }}>
                  <EditIcon color={Colors.white} />
                </View>
              );
            }}
            style={{
              width: screenWidth / 2,
              padding: 6,
              borderRadius: 10,
              backgroundColor: Colors.green30,
              marginTop: 10,
              marginBottom: 20,
            }}
            onPress={() => {
              // const statement = `
              // UPDATE food_nutri_table SET
              // base_measure = ${baseMeasure},
              // calories = ${calories},
              // carbs = ${carbs},
              // fats = ${fats},
              // protein = ${protein}
              // WHERE id = ${nutritionalTable.tableId};
              // `;

              // database.runSync(statement);

              const object = {
                name: foodName,
              };

              const nutritionalTable = {
                baseMeasure,
                unit,
                calories,
                carbs,
                fats,
                protein,
              };

              const nameValidity = validateString(foodName);

              if (!nameValidity) {
                scrollViewRef.current.scrollTo({ y: 0, animated: true });
                setNameAlertVisibility(true);
              }
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}
