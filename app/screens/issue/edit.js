import IssueForm from "../../components/issue_form";

const Edit = ({ navigation }) => {
  const color = navigation.getParam("color");
  const questionId = navigation.getParam("questionId");
  const issue = navigation.getParam("issue");

  return (
    <ScrollView>
      <IssueForm color={color} />
    </ScrollView>
  );
};

export default Edit;
