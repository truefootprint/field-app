import TextInput from "../../components/text_input";
import Button from "../../components/button";
import styles from "./styles.js";

const LoginForm = ({ placeholder="Phone", submitText="Submit", error=false, onSubmit=()=>{} }) => {
  const [phone, setPhone] = useState();

  return (
    <View {...className("login_form", styles)}>
      <TextInput placeholder={placeholder} onChangeText={setPhone} />

      <Button text={submitText} onPress={() => onSubmit(phone)} />

      {error && <Text {...className("error")}>Login failed</Text>}
    </View>
  );
};

export default LoginForm;
