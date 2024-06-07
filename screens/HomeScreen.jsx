// External dependencies
import React, { useState } from "react";
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

export default function HomeScreen() {
  // Extracting the device's dimensions.
  const screenWidth = Dimensions.get("window").width;

  // Connecting to the database.
  const database = useSQLiteContext();

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
    setDate(date);
    hideDatePicker();
  };

  // Retrieving the meals.
  const [meals, setMeals] = useState(getMeals(database));

  // Intantiating the initial date.
  const [date, setDate] = useState(new Date());

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: screenWidth,
          height: 88,
          backgroundColor: Colors.white,
          paddingHorizontal: 24,
          paddingTop: 24,
          alignItems: "center",
        }}
      >
        <Text text60L color={Colors.green30} style={{ marginTop: 8 }}>
          {date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Text>
        <TouchableOpacity onPress={showDatePicker}>
          <CalendarDayIcon
            color={Colors.green30}
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {meals.map((meal) => {
          return <MealDrawer key={meal.id} meal={meal} />;
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
  },
});
