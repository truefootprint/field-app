import styles from "./styles.js";

const NoWifi = () => (
  <View {...className("no_wifi", styles)}>
    <Text>No Wifi. Please connect to wifi.</Text>
  </View>
);

export default NoWifi;
