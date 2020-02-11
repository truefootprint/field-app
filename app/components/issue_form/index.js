import TextInput from "../text_input";
import ImageInput from "../image_input";
import Button from "../button";
import styles from "./styles.js";

const IssueForm = ({ color="blue", onSubmit=()=>{} }) => {
  const [canSubmit, setCanSubmit] = useState(false);

  const handleSubmit = () => {
    setCanSubmit(false);
  };

  // TODO: make the form submittable only if something has changed

  return (
    <View {...className("issue_form", styles(color))}>
      <Text {...className("heading")}>What is the issue?</Text>

      <View {...className("text_input")}>
        <TextInput color={color} placeholder="Add a note" />
      </View>

      <View {...className("image_input")}>
        <ImageInput placeholder="Add a photo" color={color} />
      </View>

      <View {...className("submit")}>
        <Button text="Submit" color={color} disabled={!canSubmit} onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default IssueForm;
