import IssueForm from "../../components/issue_form";

const Edit = ({ navigation }) => {
  const color = navigation.getParam("color");
  const questionId = navigation.getParam("questionId");
  const issue = navigation.getParam("issue");

  const handleSubmit = ({ text, images }) => {
    alert("submitted");
  };

  return (
    <ScrollView>
      <IssueForm color={color} issue={issue} onSubmit={handleSubmit} />
    </ScrollView>
  );
};

export default Edit;
