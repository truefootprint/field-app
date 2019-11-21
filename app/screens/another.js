import React from "react";
import { View, Text, Button } from "react-native";

const Another = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Another Screen</Text>
    <Button color="green" title="click me" onPress={() => navigation.navigate("Home")} />
  </View>
);

export default Another;
