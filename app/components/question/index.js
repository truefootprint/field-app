import SubmissionPeriod from "../../helpers/submission_period";
import Button from "../button";
import IssueListing from "../issue_listing";
import MultiChoice from "./multi_choice";
import PhotoUpload from "./photo_upload";
import FreeText from "./free_text";
import styles from "./styles.js";
import AnimateLoadingButton from "../animated_button";

const Question = ({ navigation, color="blue", id, type, text, expectedValue, responses=[], onAnswer=()=>{}, issues=[], onViewIssue=()=>{}, ...rest }) => {
  const [canSubmit, setCanSubmit] = useState(false);
  const response = SubmissionPeriod.last(responses);
  const t = useTranslate();
  const inputRef = useRef(null);

  const handleAnswer = (answer) => {
    setCanSubmit(true);
    onAnswer(answer);
  };

  React.useEffect( () => {  
    inputRef.current.changeTitle(t.submit);
   }, []);

  
  const submitText = (boo) => {
    if(boo) inputRef.current.changeTitle(t.submit);
  }

  const handleAnimation = () => {
    inputRef.current.showLoading(true);
    // mock
    setTimeout(() => {
      inputRef.current.showLoading(false);
      inputRef.current.changeTitle("✅");
      setCanSubmit(false);
    }, 1000);
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

      <AnimateLoadingButton
          ref={inputRef}
          width={350}
          height={40}
          title={submitText(canSubmit)}
          titleFontSize={14}
          titleWeight={'100'}
          titleColor="white" 
          backgroundColor={palette[color].primary}
          borderRadius={4}
          onPress={handleAnimation}
        />
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
