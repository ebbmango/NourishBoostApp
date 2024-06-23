// External dependencies
import { Dimensions } from "react-native";
import PieChart from "react-native-pie-chart";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Colors, Text, TouchableOpacity, View } from "react-native-ui-lib";
import { useSQLiteContext, addDatabaseChangeListener } from "expo-sqlite/next";

// Components
import MealDrawer from "../components/MealDrawer";

// Icons
import WheatIcon from "../components/icons/WheatIcon";
import BaconIcon from "../components/icons/BaconIcon";
import CaloriesIcon from "../components/icons/CaloriesIcon";
import DrumstickIcon from "../components/icons/DrumstickIcon";
import CalendarDayIcon from "../components/icons/CalendarDayIcon";

// Functions
import proportion from "../functions/proportion";
import fixDecimals from "../functions/fixDecimals";
import dateToString from "../functions/dateToString";

// Queries
import getMeals from "../queries/getMeals";
import getEntriesByDate from "../queries/getEntriesByDate";
import getNutrientsById from "../queries/getNutrientsById";

// Stylesheets
import styles from "../styles/styles";

export default function HomeScreen() {
  // Intantiating the initial date.
  const [date, setDate] = useState(new Date());

  // Extracting the device's dimensions.
  const screenWidth = Dimensions.get("window").width;

  // Connecting to the database.
  const database = useSQLiteContext();

  // Instantiating the query client.
  const queryClient = useQueryClient();

  // Retrieving the meals.
  const { data: meals = [] } = useQuery("meals", () => getMeals(database), {
    initialData: [],
  });

  // Retrieving the entries.
  const { data: entries = [], refetch: refetchEntries } = useQuery(
    "entries",
    () =>
      getEntriesByDate(database, { date: dateToString(date) }).map((entry) => {
        // Reformulating each entry to contain its macronutrients' information
        const { nutrientsId } = entry;
        const table = getNutrientsById(database, { nutrientsId });
        return {
          ...entry,
          fats: proportion(table.fats, entry.amount, table.baseMeasure),
          kcals: proportion(table.kcals, entry.amount, table.baseMeasure),
          carbs: proportion(table.carbs, entry.amount, table.baseMeasure),
          protein: proportion(table.protein, entry.amount, table.baseMeasure),
        };
      }),
    { initialData: [] }
  );

  // Refetching the entries in case of any relevant change in the database.
  useEffect(() => {
    const listener = addDatabaseChangeListener((change) => {
      if (["entries", "foods", "nutrients"].includes(change.tableName)) {
        refetchEntries();
      }
    });

    return () => {
      listener.remove();
    };
  }, []);

  useEffect(() => {
    refetchEntries();
  }, [date]);

  // Stateful variable for controling the display of the date picker.
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Function that displays the date picker.
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Function that hides the date picker.
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Function that retrieves the picked date.
  const handleConfirm = (date) => {
    hideDatePicker();
    setDate(date);
  };

  const [totalFats, setTotalFats] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalKcals, setTotalKcals] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);

  useEffect(() => {
    setTotalCarbs(entries.reduce((acc, val) => acc + val.carbs, 0));
    setTotalFats(entries.reduce((acc, val) => acc + val.fats, 0));
    setTotalProtein(entries.reduce((acc, val) => acc + val.protein, 0));
    setTotalKcals(entries.reduce((acc, val) => acc + val.kcals, 0));
  }, [entries]);

  const widthAndHeight = 140;

  const series = [totalProtein, totalFats, totalCarbs];
  const sliceColor = [
    Colors.green50, // protein
    Colors.green30, // fats
    Colors.green10, // carbs
  ];

  return (
    <>
      {/* Date banner */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: screenWidth,
          backgroundColor: Colors.green30,
          paddingHorizontal: 24,
          alignItems: "center",
          paddingVertical: 16,
        }}
      >
        <Text text60L white style={{ marginTop: 8 }}>
          {date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Text>
        <TouchableOpacity onPress={showDatePicker}>
          <CalendarDayIcon
            color={Colors.white}
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={date}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {/* Homepage */}
      <ScrollView
        fillViewport={true}
        contentContainerStyle={styles.homeScreen.scrollView}
      >
        {/* Overview */}
        <View
          row
          style={{
            position: "absolute",
            top: 0,
            width: screenWidth,
            justifyContent: "space-around",
            marginBottom: 4,
            backgroundColor: Colors.green10,
            paddingVertical: 12,
          }}
        >
          <View row style={{ alignItems: "center", gap: 8 }}>
            <WheatIcon color={Colors.green70} width={24} height={24} />
            <Text text70BL green70>
              {fixDecimals(totalCarbs)}g
            </Text>
          </View>
          <View row style={{ alignItems: "center", gap: 8 }}>
            <BaconIcon color={Colors.green70} width={24} height={24} />
            <Text text70BL green70>
              {fixDecimals(totalFats)}g
            </Text>
          </View>
          <View row style={{ alignItems: "center", gap: 8 }}>
            <DrumstickIcon color={Colors.green70} width={24} height={24} />
            <Text text70BL green70>
              {fixDecimals(totalProtein)}g
            </Text>
          </View>
          <View row style={{ alignItems: "center", gap: 8 }}>
            <CaloriesIcon color={Colors.green70} width={24} height={24} />
            <Text text70BL green70>
              {Math.round(totalKcals)}
            </Text>
          </View>
        </View>
        <View style={{ height: 36, marginBottom: 20 }} />
        {/* Graph chart */}
        {totalProtein + totalCarbs + totalFats !== 0 && (
          <View
            row
            style={{
              marginVertical: 12,
              gap: 24,
              alignItems: "center",
            }}
          >
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
              coverRadius={0.45}
            />
            <View style={{ gap: 4 }}>
              <View row style={{ alignItems: "center", gap: 6 }}>
                <View
                  style={{
                    width: 16,
                    height: 16,
                    backgroundColor: Colors.green10,
                    borderRadius: 3,
                  }}
                />
                <Text text70>Carbohydrates</Text>
              </View>
              <View row style={{ alignItems: "center", gap: 6 }}>
                <View
                  style={{
                    width: 16,
                    height: 16,
                    backgroundColor: Colors.green30,
                    borderRadius: 3,
                  }}
                />
                <Text text70>Fats</Text>
              </View>
              <View row style={{ alignItems: "center", gap: 6 }}>
                <View
                  style={{
                    width: 16,
                    height: 16,
                    backgroundColor: Colors.green50,
                    borderRadius: 3,
                  }}
                />
                <Text text70>Protein</Text>
              </View>
            </View>
          </View>
        )}

        {meals.map((meal) => {
          return (
            <MealDrawer
              key={meal.id}
              meal={meal}
              date={date}
              entries={entries.filter((entry) => entry.mealId === meal.id)}
            />
          );
        })}
      </ScrollView>
    </>
  );
}
