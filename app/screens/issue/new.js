import IssueForm from "../../components/issue_form";

const New = ({ navigation }) => {
  const color = navigation.getParam("color");
  const questionId = navigation.getParam("questionId");

  useBack(() => {
    navigation.dangerouslyGetParent().goBack(); // Close the modal.
  });

  const handleSubmit = ({ text, images }) => {
    alert("submitted");
  };

  return (
    <ScrollView>
      <IssueForm color={color} onSubmit={handleSubmit} />
    </ScrollView>
  );
};

export default New;
