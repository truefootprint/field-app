import TextInput from "../text_input";
import ImageInput from "../image_input";
import Button from "../button";
import styles from "./styles.js";

const IssueForm = ({ color="blue", issue, onSubmit=()=>{} }) => {
  const defaultText = issue ? issue.versionedContent.content : "";
  const defaultImagesJson = issue ? issue.versionedContent.photosJson : "[]";

  const [text, setText] = useState(defaultText);
  const [images, setImages] = useState(JSON.parse(defaultImagesJson));

  const textChanged = text !== defaultText;
  const imagesChanged = JSON.stringify(images) !== defaultImagesJson;
  const changed = textChanged || imagesChanged;

  useEffect(() => UnsavedChanges.set(changed), [changed]);

  const handleSubmit = () => {
    onSubmit({ text, images })
  };

  return (
    <View {...className("issue_form", styles(color))}>
      <Text {...className("heading")}>What is the issue?</Text>

      <View {...className("text_input")}>
        <TextInput defaultValue={text} color={color} placeholder="Add a note" onChangeText={setText} />
      </View>

      <View {...className("image_input")}>
        <ImageInput defaultImages={images} placeholder="Add a photo" color={color} onChange={setImages} />
      </View>

      <View {...className("submit")}>
        <Button text="Submit" color={color} disabled={!changed} onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default IssueForm;
