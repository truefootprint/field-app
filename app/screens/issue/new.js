import submitContent from "../../workflows/submit_content";
import pullData from "../../workflows/pull_data";
import IssueForm from "../../components/issue_form";

const New = ({ navigation }) => {
  const { connected, setData } = useContext(AppContext);

  const color = navigation.getParam("color");
  const questionId = navigation.getParam("questionId");

  useBack(() => {
    navigation.dangerouslyGetParent().goBack(); // Close the modal.
  });

  const handleSubmit = ({ text, images }) => {
    const subject = { type: ["Question", "Issue"], id: questionId };

    submitContent({ connected, subject, text, images, callback: rerender });
  };

  const rerender = () => pullData({ connected, callback: setData });

  return (
    <ScrollView>
      <IssueForm color={color} onSubmit={handleSubmit} />
    </ScrollView>
  );
};

export default New;
