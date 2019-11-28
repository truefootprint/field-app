import ButtonLike from "../button_like";
import styles from "./styles.js";

const Button = ({ color="blue", text, onPress=()=>{} }) => (
  <View>
    <TouchableOpacity {...className("touchable")} onPress={onPress} activeOpacity={0.8}>
      <ButtonLike color={color} fill={true} center={true}>
        <Text {...className("text", styles(color))}>{text}</Text>
      </ButtonLike>
    </TouchableOpacity>
  </View>
);

export default Button;
