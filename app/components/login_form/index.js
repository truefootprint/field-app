import TextInput from "../../components/text_input";
import Button from "../../components/button";
import { Phone, ArrowRight, Exclamation } from "../svg_icon";
import styles from "./styles.js";

const LoginForm = ({ color="purple", error=false, onSubmit=()=>{} }) => {
  const [phone, setPhone] = useState();

  const handlePress = () => {
    Keyboard.dismiss();
    onSubmit(phone);
  };

  return (
    <View {...className("login_form", styles)}>
      <View {...className("row1")}>
        <Phone size={25} />
        <Text {...className("text")}>What’s your mobile number?</Text>
      </View>

      <View {...className("row2")}>
        <View {...className("input")}>
          <TextInput color={color} placeholder="e.g. 01234567890" onChangeText={setPhone} />
        </View>

        <Button color={color} icon={<ArrowRight color="white" />} onPress={handlePress} />
      </View>

      {error && <Text {...className("error")}>
        Login failed. Unrecognised mobile number.
      </Text>}
    </View>
  );
};

export default LoginForm;
