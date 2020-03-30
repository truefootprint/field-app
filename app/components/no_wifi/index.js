import { NoWifi as None, ArrowRight, Wifi } from "../svg_icon";
import styles from "./styles.js";

const NoWifi = () => (
  <View {...className("no_wifi", styles)}>
    <None size="30%" />

    <View {...className("arrow")}>
      <ArrowRight size={50} color={styles.arrow.color} />
    </View>

    <Wifi size="30%" />
  </View>
);

export default NoWifi;
