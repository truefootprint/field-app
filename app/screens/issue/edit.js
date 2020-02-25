import submitContent from "../../workflows/submit_content";
import IssueForm from "../../components/issue_form";

const Edit = ({ navigation }) => {
  const { connected } = useContext(AppContext);

  const color = navigation.getParam("color");
  const questionId = navigation.getParam("questionId");
  const issue = navigation.getParam("issue");

  const handleSubmit = ({ text, images }) => {
    const subject = { type: "Issue", id: issue.id };
    const parent = issue.versionedContent;

    submitContent({ connected, subject, text, images, parent });
  };

  return (
    <ScrollView>
      <IssueForm color={color} issue={issue} onSubmit={handleSubmit} />
    </ScrollView>
  );
};

export default Edit;
