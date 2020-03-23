import IssuePreview from "../issue_preview";
import Checkbox from "../checkbox";
import styles from "./styles.js";

const IssueListing = ({ color="blue", questionId, issues=[], onViewIssue=()=>{} }) => {
  const t = useTranslate();

  const openIssues = issues.filter(i => !i.resolution);
  const closedIssues = issues.filter(i => i.resolution);
  const showNewIssue = openIssues.length === 0;

  const handleViewIssue = (issue = {}) => {
    return () => onViewIssue({ color, questionId, issueUuid: issue.uuid });
  };

  return (
    <View {...className("issue_listing", styles(color))}>
      {openIssues.map((issue, i) => (
        <IssuePreview key={i} color={color} issue={issue} onOpen={handleViewIssue(issue)} />
      ))}

      {closedIssues.map((issue, i) => (
        <IssuePreview key={i} color={color} issue={issue} onOpen={handleViewIssue(issue)} />
      ))}

      {showNewIssue &&
        <Checkbox color={color} checked={false} onCheck={handleViewIssue()}>
          {t.issue.record}
        </Checkbox>
      }
    </View>
  );
};

export default IssueListing;
