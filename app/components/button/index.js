import ButtonLike from "../button_like";
import styles from "./styles.js";

const Button = ({ color="blue", text, caps=true, fill=true, disabled=false, onPress=()=>{} }) => {
  const buttonLike = (
    <View {...className([disabled && "disabled"], styles(color))}>
      <ButtonLike color={color} fill={fill} center={true}>
        <Text {...className(["text", fill && "white", caps && "caps"])}>{text}</Text>
      </ButtonLike>
    </View>
  );

  if (disabled) return buttonLike;

  return (
    <View>
      <TouchableOpacity {...className("touchable")} onPress={onPress} activeOpacity={0.8}>
        {buttonLike}
      </TouchableOpacity>
    </View>
  );
};

export default Button;
