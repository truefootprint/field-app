import File from "../../helpers/file";
import Checkbox from "../checkbox";
import Button from "../button";
import Image from "../image";
import styles from "./styles.js";

const IssuePreview = ({ color="blue", issue={ notes: [] }, onOpen=()=>{} }) => {
  const note = issue.notes.find(n => n.text && n.text.length > 0);
  const text = note && note.text;

  return (
    <View {...className("issue_preview", styles(color))}>
      <View {...className("side_by_side")}>
        <View {...className("checkbox")}>
          <Checkbox color={color} checked={true} disabled={true}>Issue {issue.resolved ? "resolved" : "recorded"}</Checkbox>
        </View>

        <View {...className("open")}>
          <Button color={color} caps={false} fill={false} text="View details" onPress={onOpen} />
        </View>
      </View>

      <Text {...className("description")} numberOfLines={2}>
        {text}
      </Text>
    </View>
  );
};

export default IssuePreview;
