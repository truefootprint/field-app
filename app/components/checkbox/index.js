import ButtonLike from "../button_like";
import styles from "./styles.js";

const Checkbox = ({ color="blue", defaultChecked=false, checked, onCheck=()=>{}, Box=Square, children }) => {
  const [active, setActive] = useState(defaultChecked);
  const controlled = typeof checked !== "undefined";

  useEffect(() => { controlled && setActive(checked); }, [checked]);

  const handlePress = () => {
    const returnValue = onCheck(active);

    if (controlled) {
      return;
    } else if (typeof returnValue === "boolean") {
      setActive(returnValue);
    } else {
      setActive(c => !c);
    }
  };

  return (
    <View {...className("checkbox", styles(color))} data={{ checked: active }}>
      <TouchableOpacity {...className("touchable")} onPress={handlePress} activeOpacity={0.8}>
        <ButtonLike color={color} fill={active}>
          <Box color={color} active={active} />

          <Text {...className(["text", active && "white"])}>
            {children}
          </Text>
        </ButtonLike>
      </TouchableOpacity>
    </View>
  );
};

const Square = ({ color, active }) => (
  // TODO: add tick mark
  <View {...className(["square", active && "filled"], styles(color))} />
);

export default Checkbox;
