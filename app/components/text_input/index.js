import { TextInput as NativeInput } from "react-native";
import stylesheet from "./styles.js";

// TODO: show numeric(?) keyboard if property is set
// TODO: de-focus on scroll?
// TODO: placeholder / units / single line version?

const TextInput = ({ color="blue", placeholder, defaultValue, onChangeText=()=>{}, onFocus=()=>{}, onBlur=()=>{}, ...rest }) => {
  const [focussed, setFocussed] = useState(false);
  const [text, setText] = useState(defaultValue || "");

  const placeholderVisible = text.length === 0;
  const showAlternative = focussed && placeholder && !placeholderVisible;

  const styles = stylesheet(color);
  const classes = ["native_input", focussed && "focussed", placeholderVisible && "placeholder"];

  const handleChange = (text) => { setText(text); onChangeText(text); };
  const handleFocus = () => { setFocussed(true); onFocus(); };
  const handleBlur = () => { setFocussed(false); onBlur(); };

  return (
    <View>
      {showAlternative && <Text {...className("alternative")}>{placeholder}</Text>}

      <NativeInput {...className(classes, styles)}
        value={text}
        multiline={true}
        placeholder={placeholder}
        placeholderTextColor={styles.placeholder.color}
        selectionColor={styles.selection.color}
        onChangeText={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest} />
    </View>
  );
};

export default TextInput;
