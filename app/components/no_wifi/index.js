import styles from "./styles.js";

const NoWifi = () => {
  const t = useTranslate();

  return (
    <View {...className("no_wifi", styles)}>
      <Text>{t.no_wifi}</Text>
    </View>
  );
};

export default NoWifi;
