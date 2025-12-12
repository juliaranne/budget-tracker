import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { SafeAreaView } from "react-native-safe-area-context";

const response = {
  data: [
    {
      category: "fitness",
      date: "Sun Nov 23 2025 20:00:58 GMT+0000 (Greenwich Mean Time)",
      value: "78",
    },
    {
      category: "fashion",
      date: "Sun Nov 23 2025 20:00:58 GMT+0000 (Greenwich Mean Time)",
      value: "199",
    },
    {
      category: "beauty",
      date: "Sun Nov 23 2025 20:00:58 GMT+0000 (Greenwich Mean Time)",
      value: "1.50",
    },
  ],
};

export default function StatsScreen() {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
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
