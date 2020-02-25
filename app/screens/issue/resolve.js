import submitContent from "../../workflows/submit_content";
import IssueForm from "../../components/issue_form";

const Resolve = ({ navigation }) => {
  const { connected } = useContext(AppContext);

  const color = navigation.getParam("color");
  const questionId = navigation.getParam("questionId");
  const issue = navigation.getParam("issue");

  const handleSubmit = ({ text, images }) => {
    const subject = { type: ["Issue", "Resolution"], id: issue.id };
    const parent = issue.versionedContent;

    submitContent({ connected, subject, text, images, parent });
  };

  return (
    <ScrollView>
      <IssueForm color={color} onSubmit={handleSubmit} />
    </ScrollView>
  );
};

export default Resolve;
