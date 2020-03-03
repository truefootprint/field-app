import Layout from "../components/layout";
import IssueComponent from "../components/issue";

const Issue = ({ navigation }) => {
  const color = navigation.getParam("color");
  const questionId = navigation.getParam("questionId");
  const issue = navigation.getParam("issue");
  const currentUser = navigation.getParam("currentUser");

  return (
    <Layout>
      <IssueComponent color={color} questionId={questionId} currentUser={currentUser} {...issue} />
    </Layout>
  );
};

export default Issue;
