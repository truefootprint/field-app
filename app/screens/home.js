import React from "react";
import { View, Text, Button } from "react-native";
import testId from "../helpers/test_id";

const Home = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text {...testId("home.text")}>Home Screen</Text>
    <Button {...testId("home.button")} title="click me" onPress={() => navigation.navigate("Another")} />
  </View>
);

export default Home;
