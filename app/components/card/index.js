import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import testId from "../../helpers/test_id";

const Card = () => {
  const [counter, setCounter] = useState(0);

  return (
    <View>
      <Text {...testId("card.text")}>counter: {counter}</Text>
      <Button {...testId("card.button")} title="increment" onPress={() => setCounter(c => c + 1)} />
    </View>
  );
};

export default Card;
