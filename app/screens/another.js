import React from "react";
import { View, Text, Button } from "react-native";
import testId from "../helpers/test_id";

const Another = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text {...testId("another.text")}>Another Screen</Text>
    <Button {...testId("another.button")} color="green" title="click me" onPress={() => navigation.navigate("Home")} />
  </View>
);

export default Another;
