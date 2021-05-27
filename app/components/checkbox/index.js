import ButtonLike from "../button_like";
import { Tick } from "../svg_icon";
import styles from "./styles.js";
import { host } from "../../../config/host.json";
import Image from "react-native-fullwidth-image";

const Checkbox = ({ obj={photo: undefined}, color="blue", defaultChecked=false, checked, disabled=false, onCheck=()=>{}, rounded=false, recordIssue=false, Box=Square, children }) => {
  const [active, setActive] = useState(defaultChecked);
  const controlled = typeof checked !== "undefined";
  const fill = active && !disabled;

  useEffect(() => { controlled && setActive(checked); }, [checked]);

  const handlePress = () => {
    onCheck(!active);

    if (active) setActive(!active);

    if (controlled) return;
    setActive(!active);
  };

  const buttonLike = (
    <View {...className(["checkbox", disabled && "disabled"], styles(color))} data={{ checked: active }}>
      <ButtonLike color={color} border={!disabled && !recordIssue} rounded={rounded} fill={fill}>
        <Box color={color} active={active} disabled={disabled} />

        <Text {...className(["text", fill && "white", disabled && "grey", recordIssue && "underline_text"])}>
          {children}
        </Text>
      </ButtonLike>
      {obj.photo !== undefined &&
        <Image color={color} source={{uri: `${host}/${obj.photo}`}}/>
      } 
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
