import React from "react";
import { View, Text, Button } from "react-native";
import testId from "../helpers/test_id";
import Card from "../components/card";

const Home = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text {...testId("home.text")}>Home Screen</Text>
    <Button {...testId("home.button")} title="click me" onPress={() => navigation.navigate("Another")} />


    <Card />
  </View>
);

export default Home;
