import IssueNote from "../issue_note";
import TextInput from "../text_input";
import styles from "./styles.js";

const Issue = ({ color, currentUser, resolved, notes }) => {
  notes = notes || [];

  const scrollView = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  const scrollToEnd = () => {
    if (scrollView.current) scrollView.current.scrollToEnd({ animated: false });
  };

  const classes = ["inner", visible && "visible"];
  return (
    <KeyboardAvoidingView {...className("issue", styles(color))} behavior="height">
      <ScrollView {...className(classes)} ref={scrollView} onContentSizeChange={scrollToEnd}>
        {notes.map((note, i) => (
          <IssueNote
            key={i}
            color={color}
            currentUser={currentUser}
            previousNote={notes[i - 1]}
            {...note} />
        ))}
      </ScrollView>

      <View {...className("bottom")}>
        <View {...className("text_input")}>
          <TextInput color={color} placeholder="Add your notes..." />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Issue;
