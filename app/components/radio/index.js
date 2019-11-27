import ButtonLike from "../button_like";
import styles from "./styles.js";

const Radio = ({ color="blue", defaultChecked=false, onCheck=()=>{}, children }) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handlePress = () => {
    // TODO
  };

  return (
    <View {...className("radio", styles(color))}>
      <ButtonLike color={color} fill={checked}>
        <View {...className(["circle", checked && "filled"])} />
        <Text {...className(["text", checked && "white"])}>
          {children}
        </Text>
      </ButtonLike>
    </View>
  );
};

export default Radio;
