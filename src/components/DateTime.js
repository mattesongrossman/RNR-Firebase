import React, { useEffect, useState } from "react";
import { Button, View, SafeAreaView } from "react-native";
import styles from "./styles";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateTime() {
  //   const [date, setDate] = useState(new Date(1598051730000));
  //   const [time, setTime] = useState(new Date());
  //   const [mode, setMode] = useState("date");
  //   const [show, setShow] = useState(false);

  //   const onChange = (event, selectedDate) => {
  //     const currentDate = selectedDate || date;
  //     setShow(Platform.OS === "ios");
  //     setDate(currentDate);
  //   };

  //   const showMode = (currentMode) => {
  //     setShow(true);
  //     setMode(currentMode);
  //   };

  //   const showDatepicker = () => {
  //     showMode("date");
  //   };

  //   const showTimepicker = () => {
  //     showMode("time");
  //   };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.formContainer}>
          <Button onPress={showDatepicker} title="Select Date" />
        </View>
        <View style={styles.formContainer}>
          <Button onPress={showTimepicker} title="Select Time" />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
