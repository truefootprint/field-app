import TextInput from "../text_input";
import ImageInput from "../image_input";
import Image from "../image";
import Button from "../button";
import styles from "./styles.js";

const IssueForm = ({ color="blue", issue, editable=true, onSubmit=()=>{} }) => {
  const defaultText = issue ? issue.versionedContent.text : "";
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

  const imageClasses = (i) => ["image", i === images.length - 1 && "last_child"];

  return (
    <View {...className("issue_form", styles(color))}>
      <Text {...className("heading")}>What is the issue?</Text>

      <View {...className("text_section")}>
        {editable
          ? <TextInput defaultValue={text} color={color} placeholder="Add a note" onChangeText={setText} />
          : <Text {...className("text")}>{text}</Text>}
      </View>

      <View {...className("images_section")}>
        {editable
          ? <ImageInput defaultImages={images} placeholder="Add a photo" color={color} onChange={setImages} />
          : images.map((image, i) => <Image key={i} {...className("image")} source={image} />)}
      </View>

      {editable && <View {...className("submit")}>
        <Button text="Submit" color={color} disabled={!changed} onPress={handleSubmit} />
      </View>}
    </View>
  );
};

export default IssueForm;
