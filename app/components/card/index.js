import React from "react";
import { Text, View, Button } from "react-native";
import testId from "../../helpers/test_id";
import styles from "./styles.js";

const Card = ({ color="blue", heading, number, outOf, children }) => {
  const s = styles(color);

  return (
    <View style={s.card}>
      <View style={s.top}>
        <Text {...testId("heading")} style={s.heading} >{heading}</Text>
        <Text {...testId("ordinal")} style={s.ordinal} >{number} of {outOf}</Text>
      </View>

      {children}
    </View>
  );
};

export default Card;
