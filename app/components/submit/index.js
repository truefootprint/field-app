import ButtonLike from "../button_like";
import styles from "./styles.js";

const Submit = ({ color="blue", text="Submit" }) => (
  <TouchableOpacity activeOpacity={0.8}>
    <ButtonLike color={color} fill={true} center={true}>
      <Text {...className("text", styles(color))}>{text}</Text>
    </ButtonLike>
  </TouchableOpacity>
);

export default Submit;
