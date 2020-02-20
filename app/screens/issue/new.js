import IssueForm from "../../components/issue_form";

const New = ({ navigation }) => {
  const color = navigation.getParam("color");
  const questionId = navigation.getParam("questionId");

  useBack(() => {
    navigation.dangerouslyGetParent().goBack(); // Close the modal.
  });

  return (
    <ScrollView>
      <IssueForm color={color} />
    </ScrollView>
  );
};

export default New;
