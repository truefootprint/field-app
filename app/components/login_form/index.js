import TextInput from "../../components/text_input";
import Button from "../../components/button";
import styles from "./styles.js";

const LoginForm = ({ placeholder="Phone", submitText="Submit", onSubmit=()=>{} }) => {
  const [phone, setPhone] = useState();

  return (
    <View {...className("login_form", styles)}>
      <TextInput placeholder={placeholder} onChangeText={setPhone} />

      <Button text={submitText} onPress={() => onSubmit(phone)} />
    </View>
  );
};

export default LoginForm;
