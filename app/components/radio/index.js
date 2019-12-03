import Checkbox from "../checkbox";
import styles from "./styles.js";

const Radio = (props) => (
  <Checkbox {...props} rounded={true} Box={Circle} />
);

const Circle = ({ color, active }) => (
  <View {...className(["circle", active && "filled"], styles(color))} />
);

export default Radio;
