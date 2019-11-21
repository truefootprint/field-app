import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Home = () => (
  <View style={styles.container} accessibilityLabel="root">
    <Text>Open up App.js to start working on your app!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
