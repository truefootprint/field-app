import IssuePreview from "../issue_preview";
import Checkbox from "../checkbox";
import styles from "./styles.js";

const IssueListing = ({ color="blue", questionId, issues=[], onAction=()=>{} }) => {
  const openIssues = issues.filter(i => !i.resolution);
  const closedIssues = issues.filter(i => i.resolution);
  const showNewIssue = openIssues.length === 0;

  const action = (name, issue) => {
    return () => onAction({ action: name, color, questionId, issue });
  }

  return (
    <View {...className("issue_listing", styles(color))}>
      {closedIssues.map((issue, i) => (
        <IssuePreview key={i} color={color} issue={issue} onOpen={action("Show", issue)} />
      ))}

      {openIssues.map((issue, i) => (
        <IssuePreview key={i} color={color} issue={issue} onOpen={action("Show", issue)} />
      ))}

      {showNewIssue &&
        <Checkbox color={color} checked={false} onCheck={action("Edit")}>
          Record an issue
        </Checkbox>
      }
    </View>
  );
};

export default IssueListing;
