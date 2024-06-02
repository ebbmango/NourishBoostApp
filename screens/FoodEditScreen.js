import { useState } from "react";

import { addDatabaseChangeListener, useSQLiteContext } from "expo-sqlite/next";
import { Dimensions } from "react-native";

import {
  Button,
  Colors,
  GridView,
  NumberInput,
  Picker,
  Text,
  View,
} from "react-native-ui-lib";

import GaugeIcon from "../components/icons/GaugeIcon";
import RulerVerticalIcon from "../components/icons/RulerVerticalIcon";
import EditIcon from "../components/icons/EditIcon";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function FoodEditScreen() {
  // Retrieving the database.

  const navigator = useNavigation();
  const database = useSQLiteContext();

  const route = useRoute();
  
  const { nutritionalTable } = route.params;

  const [baseMeasure, setBaseMeasure] = useState(nutritionalTable.baseMeasure);
  const [calories, setCalories] = useState(nutritionalTable.calories);
  const [carbs, setCarbs] = useState(nutritionalTable.carbs);
  const [fats, setFats] = useState(nutritionalTable.fats);
  const [protein, setProtein] = useState(nutritionalTable.protein);


  const screenWidth = Dimensions.get("window").width;

  return (
    <ScrollView>
      <Text text30 style={{ marginLeft: 16, marginVertical: 20 }}>
        {nutritionalTable.foodName}
      </Text>
      {/* Field that changes the amount of food */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
          marginLeft: 16,
        }}
      >
        <View width={24} height={24}>
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
        <View width={24} height={24}>
          <RulerVerticalIcon />
        </View>
        <View
          centerV
          style={{
            width: screenWidth - 64,
            height: 36,
            backgroundColor: Colors.grey60,
            borderRadius: 5,
            paddingHorizontal: 10,
          }}
        >
          <Text>{nutritionalTable.unit}</Text>
        </View>
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
          label="Confirm edit"
          iconSource={() => {
            return (
              <View width={20} height={20} style={{ marginRight: 6 }}>
                <EditIcon color={Colors.white} />
              </View>
            );
          }}
          style={{
            width: screenWidth / 2 - 15,
            padding: 6,
            borderRadius: 10,
            backgroundColor: Colors.green30,
            marginTop: 10,
            marginBottom: 20,
          }}
          onPress={() => {
            const statement = `
            UPDATE food_nutri_table SET
            base_measure = ${baseMeasure},
            calories = ${calories},
            carbs = ${carbs},
            fats = ${fats},
            protein = ${protein}
            WHERE id = ${nutritionalTable.tableId};
            `;

            database.runSync(statement);

            navigator.goBack();
          }}
        />
      </View>
    </ScrollView>
  );
}
