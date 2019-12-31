import TextInput from "../text_input";

const FreeText = ({ color="blue", placeholder, units, response, onAnswer=()=>{}, setCanSubmit=()=>{}, ...rest }) => {
  const [previous, setPrevious] = useState("");
  const defaultValue = response && response.value;

  const handleBlur = (text) => {
    if (text === previous) return;

    setPrevious(text);
    onAnswer(text);
  };

  // Enable the submit button as soon as the user starts typing.
  const handleChange = (text) => {
    setCanSubmit(text !== previous);
  };

  return (
    <TextInput
      color={color}
      placeholder={placeholder}
      units={units}
      defaultValue={defaultValue}
      onBlur={handleBlur}
      onChangeText={handleChange} />
  );
};

export default FreeText;
