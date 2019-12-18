import Checkbox from "../checkbox";
import Button from "../button";
import MultiChoice from "./multi_choice";
import PhotoUpload from "./photo_upload";
import FreeText from "./free_text";
import styles from "./styles.js";

const Question = ({ color="blue", type, text, onAnswer=()=>{}, ...rest }) => {
  const [canSubmit, setCanSubmit] = useState(false);

  const handleAnswer = (answer) => {
    setCanSubmit(true);
    onAnswer(answer);
  };

  const handleSubmit = () => {
    // The submit button is to reassure the user, it doesn't actually send data.
    setCanSubmit(false);
  };

  type = type && snakeCase(type).replace("_question", "");

  return (
    <View>
      <Text {...className("text", styles(color))}>{text}</Text>

      <View {...className(type)}>
        {questionFor({ type, color, onAnswer: handleAnswer, setCanSubmit, ...rest })}
      </View>

      <View {...className(`${type}_issue`)}>
        <Checkbox color={color}>Record an issue</Checkbox>
      </View>

      {<Button text="Submit" color={color} disabled={!canSubmit} onPress={handleSubmit} />}
    </View>
  );
};

const questionFor = ({ type, ...props }) => {
  switch (type) {
    case "multi_choice": return <MultiChoice {...props} />;
    case "photo_upload": return <PhotoUpload {...props} />;
    case "free_text": return <FreeText {...props} />;
  };
};

export default Question;
