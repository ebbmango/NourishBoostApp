// External dependencies
import React, { useEffect, useState } from "react";
import { useSQLiteContext, addDatabaseChangeListener } from "expo-sqlite/next";
import { Dimensions, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors, Text, TouchableOpacity, View } from "react-native-ui-lib";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// Components
import CalendarDayIcon from "../components/icons/CalendarDayIcon";
import MealDrawer from "../components/MealDrawer";

// Queries
import getMeals from "../queries/getMeals";
import { useQuery, useQueryClient } from "react-query";
import getEntries from "../queries/getEntries";
import formatDate from "../functions/formatDate";

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

  const { data: entries = [], refetch: refetchEntries } = useQuery(
    "entries",
    () => getEntries(database, { date: formatDate(date) }),
    { initialData: [] }
  );

  useEffect(() => {
    const listener = addDatabaseChangeListener((change) => {
      if (change.tableName === "entries") {
        refetchEntries();
        setMealsKey(Date.now());
      }
    });

    return () => {
      listener.remove();
    };
  }, []);

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

  // console.log("penes");
  // console.log(entries);

  const [mealsKey, setMealsKey] = useState(Date.now());

  return (
    <>
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
      <ScrollView key={mealsKey} contentContainerStyle={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },
});
