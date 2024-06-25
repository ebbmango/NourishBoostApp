import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import homeScreenStyles from "../styles/homeScreenStyles";
import { Colors, Text, TouchableOpacity, View } from "react-native-ui-lib";
import CalendarDayIcon from "../components/icons/CalendarDayIcon";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const screenWidth = Dimensions.get("window").width;

import { LineChart } from "react-native-chart-kit";

export default function WeightScreen() {
  const [date, setDate] = useState(new Date());

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

  const chartConfig = {
    backgroundGradientFrom: Colors.grey10,
    backgroundGradientTo: Colors.grey10,
    color: (opacity = 1) => Colors.green40,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Rainy Days"], // optional
  };

  return (
    <>
      {/* Date banner */}
      <View style={homeScreenStyles.dateBanner}>
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
      {/* <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
