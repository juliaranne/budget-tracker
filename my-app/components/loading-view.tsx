import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Loader() {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color="navy" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
  },
});
