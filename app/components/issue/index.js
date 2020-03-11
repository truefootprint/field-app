import IssueNote from "../issue_note";
import TextInput from "../text_input";
import ImageInput from "../image_input";
import { Camera } from "../svg_icon";
import styles from "./styles.js";

const Issue = ({ color="blue", currentUser, resolved, notes, onNote=()=>{} }) => {
  notes = mixinCurrentUser(notes, currentUser);

  const [photos, setPhotos] = useState([]);
  const [count, setCount] = useState(0);
  const scrollView = useRef();

  const scrollToEnd = () => {
    if (scrollView.current) scrollView.current.scrollToEnd({ animated: false });
  };

  const handleSubmit = (text) => {
    onNote({ text, photos });
    setPhotos([]);
    setCount(c => c + 1); // Clear the text input
  };

  return (
    <KeyboardAvoidingView {...className("issue", styles(color))} behavior="height">
      <ScrollView {...className("inner")} ref={scrollView} onContentSizeChange={scrollToEnd}>
        {notes.map((note, i) => (
          <IssueNote
            key={i}
            color={color}
            currentUser={currentUser}
            previousNote={notes[i - 1]}
            {...note} />
        ))}
      </ScrollView>

      <View {...className("bottom")} key={count}>
        <View {...className("text_input")}>
          <TextInput color={color} placeholder="Add your notes..." onSubmit={handleSubmit} />
        </View>

        <View {...className("image_input")}>
          <ImageInput color={color} icon={<Camera />} onChange={setPhotos} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const mixinCurrentUser = (notes, currentUser) => (
  [notes].flat().filter(n => n).map(note => {
    if (note.user) return note;

    note.user = currentUser;
    note.userId = currentUser.id;

    return note;
  })
);

export default Issue;
