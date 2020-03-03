import IssueNote from "../issue_note";
import styles from "./styles.js";

const Issue = ({ color, currentUser, resolved, notes }) => {
  notes = notes || [];

  return (
    <View {...className("issue", styles(color))}>
      <ScrollView {...className("inner")}>
        {notes.map((note, i) => (
          <IssueNote
            key={i}
            color={color}
            currentUser={currentUser}
            previousNote={notes[i - 1]}
            {...note} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Issue;
