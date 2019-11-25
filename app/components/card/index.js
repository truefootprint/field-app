import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import testId from "../../helpers/test_id";
import stylesheet from "./styles.js";

const Card = () => {
  const [counter, setCounter] = useState(0);
  const styles = stylesheet("green");

  return (
    <View style={styles.card}>
      <View style={styles.colored_bar} />

      <Text {...testId("card.text")}>counter: {counter}</Text>
      <Button {...testId("card.button")} title="increment" onPress={() => setCounter(c => c + 1)} />
    </View>
  );
};

export default Card;
