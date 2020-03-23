import SubmissionPeriod from "../../helpers/submission_period";
import Button from "../button";
import IssueListing from "../issue_listing";
import MultiChoice from "./multi_choice";
import PhotoUpload from "./photo_upload";
import FreeText from "./free_text";
import styles from "./styles.js";

const Question = ({ navigation, color="blue", id, type, text, expectedValue, responses=[], onAnswer=()=>{}, issues=[], onViewIssue=()=>{}, ...rest }) => {
  const [canSubmit, setCanSubmit] = useState(false);
  const response = SubmissionPeriod.last(responses);
  const t = useTranslate();

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

      {expectedValue && <Text {...className("expected_value")}>{expectedValue.text}</Text>}

      <View {...className(type)}>
        {questionFor({ type, color, response, onAnswer: handleAnswer, setCanSubmit, ...rest })}
      </View>

      {<View {...className(`${type}_issue`)}>
        <IssueListing color={color} questionId={id} issues={issues} onViewIssue={onViewIssue} />
      </View>}

      {<Button text={t.submit} color={color} disabled={!canSubmit} onPress={handleSubmit} />}
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

export default withNavigation(Question);
