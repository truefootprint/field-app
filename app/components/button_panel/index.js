import Button from "../button";
import styles from "./styles.js";

const ButtonPanel = ({ buttons=[] }) => (
  <View {...className("button_panel", styles)}>
    {buttons.map((props, i) => <Button key={i} {...props} />)}
  </View>
);

export default ButtonPanel;
