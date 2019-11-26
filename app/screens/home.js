import React from "react";
import { View, Text, Button } from "react-native";
import testId from "../helpers/test_id";
import Card from "../components/card";

const Home = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <View style={{ width: 50, height: 50 }} />

    <Card color="blue" heading="Cement" number={1} outOf={3}>
      <Text>Does the cement float in water?</Text>
    </Card>

    <Card color="green" heading="Sizes and position" number={2} outOf={3}>
      <Text>Is the foundation going from gate to doorstep?</Text>
    </Card>

    <Card color="red" heading="Tiles" number={3} outOf={3}>
      <Text>Are the tiles black and white?</Text>
    </Card>
  </View>
);

export default Home;
