import React from "react";
import { View, Text, Button } from "react-native";

const Home = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Home Screen</Text>
    <Button title="click me" onPress={() => navigation.navigate("Another")} />
  </View>
);

export default Home;
