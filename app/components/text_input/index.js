import { TextInput as NativeInput } from "react-native";
import stylesheet from "./styles.js";

const TextInput = ({ color="blue", placeholder, defaultValue, units, onChangeText=()=>{}, onFocus=()=>{}, onBlur=()=>{}, onSubmit=()=>{}, question,...rest }) => {
  const [focussed, setFocussed] = useState(false);
  const [text, setText] = useState(defaultValue || "");

  const placeholderVisible = text.length === 0;
  const showAlternative = focussed && placeholder && !placeholderVisible;

  const styles = stylesheet(color);
  const classes = ["native_input", focussed && "focussed", placeholderVisible && "placeholder"];

  const handleChange = (text) => { setText(text); onChangeText(text); };
  const handleFocus = () => { setFocussed(true); onFocus(text); };
  const handleBlur = () => { setFocussed(false); onBlur(text); };
  const handleSubmit = () => { setFocussed(false); onSubmit(text); };
  const questionStyles = {borderTopColor: "#ddd", borderLeftColor: "#ddd", borderRightColor: "#ddd", borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1};
  //const focusedQuestionStyles = {borderTopColor: "#ddd", borderLeftColor: "#ddd", borderRightColor: "#ddd", borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1};

  //useEffect(() => {
    // Update the document title using the browser API
    // TODO COME BACK
    if (focussed && question){
      styles.native_input = {...styles.native_input, ...styles.focused_question_styles};
    } else if (question) {
      styles.native_input = {...styles.native_input, ...questionStyles};
    }
  //}, []);
 

  


  return (
    <View>
      {showAlternative && <Text {...className("alternative", styles)}>{placeholder}</Text>}

      <View {...className("side_by_side", styles)}>
        <NativeInput
          {...className(classes)}
          value={text}
          multiline={true}
          numberOfLines = {4}
          placeholder={placeholder}
          keyboardType={units ? "numeric" : "default"}
          placeholderTextColor={styles.placeholder.color}
          blurOnSubmit={true}
          selectionColor={styles.selection.color}
          onChangeText={handleChange}
          color="black"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSubmit}
          {...rest} />

        {units && <Text {...className(["units", focussed && "focussed"])}>
          {units}
        </Text>}
      </View>
    </View>
  );
};

export default TextInput;
