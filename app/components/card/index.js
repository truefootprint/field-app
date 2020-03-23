import styles from "./styles.js";

const Card = ({ color="blue", heading, number, outOf, children }) => {
  const t = useTranslate();

  return (
    <View {...className("card", styles(color))}>
      <View {...className("inner")}>
        <View {...className("top")}>
          <Text {...className("heading")}>{heading}</Text>
          <Text {...className("ordinal")}>{t("n_of_m", { n: number, m: outOf})}</Text>
        </View>

        {children}
      </View>
    </View>
  );
};

export default Card;
