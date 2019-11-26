import styles from "./styles.js";

const Card = ({ color="blue", heading, number, outOf, children }) => (
  <View {...className("card", styles(color))}>
    <View {...className("top")}>
      <Text {...className("heading")}>{heading}</Text>
      <Text {...className("ordinal")}>{number} of {outOf}</Text>
    </View>

    {children}
  </View>
);

export default Card;
