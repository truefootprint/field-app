import ButtonLike from "../button_like";
import { Tick } from "../svg_icon";
import styles from "./styles.js";

const Checkbox = ({ color="blue", defaultChecked=false, checked, disabled=false, onCheck=()=>{}, rounded=false, Box=Square, children }) => {
  const [active, setActive] = useState(defaultChecked);
  const controlled = typeof checked !== "undefined";
  const fill = active && !disabled;

  useEffect(() => { controlled && setActive(checked); }, [checked]);

  const handlePress = () => {
    onCheck(!active);

    if (controlled) return;
    setActive(!active);
  };

  const buttonLike = (
    <View {...className(["checkbox", disabled && "disabled"], styles(color))} data={{ checked: active }}>
      <ButtonLike color={color} border={!disabled} rounded={rounded} fill={fill}>
        <Box color={color} active={active} disabled={disabled} />

        <Text {...className(["text", fill && "white", disabled && "grey"])}>
          {children}
        </Text>
      </ButtonLike>
    </View>
  );

  if (disabled) return buttonLike;

  return (
    <TouchableOpacity {...className("touchable")} onPress={handlePress} activeOpacity={0.8}>
      {buttonLike}
    </TouchableOpacity>
  );
};

const Square = ({ color, active, disabled }) => {
  const s = styles(color);
  const tick = disabled ? "disabled_tick" : "tick";

  return (
    <View {...className(["square", disabled && "disabled_square"], s)}>
      {active && <Tick size={12} color={s[tick].color} />}
    </View>
  );
};

export default Checkbox;
