import React, { useState } from "react";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useDateStore } from "@/store/dateStore";

export default function ModalScreen() {
  const setSelectedDate = useDateStore((s) => s.setSelectedDate);

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === "set" && date) {
      setSelectedDate(date);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <DateTimePicker
        mode="date"
        value={new Date()}
        display="spinner"
        onChange={(event, date) => handleDateChange(event, date)}
      />
      <Link href="/" style={styles.link}>
        <ThemedText type="link">Done</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    fontSize: 20,
  },
});
