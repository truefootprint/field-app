import Layout from "../components/layout";
import ProjectComponent from "../components/project";
import answerQuestion from "../workflows/answer_question";

const Project = ({ navigation }) => {
  const { data, connected } = useContext(AppContext);

  const index = navigation.getParam("projectIndex");
  const project = data.projects[index];

  useBack(navigation, () => {
    useTranslate.unsetProject(); // Don't use project-specific translations.
    navigation.navigate("Home");
  });

  const handleAnswer = ({ question, answer }) => {
    answerQuestion({ connected, question, answer });
  };

  const handleViewIssue = ({ color, questionId, issueUuid }) => {
    navigation.navigate("Issue", { color, questionId, issueUuid });
  };

  const handleViewSource = (sourceMaterial) => {
    navigation.navigate("Source", sourceMaterial);
  };

  return (
    <Layout>
      <ProjectComponent
        index={index}
        onAnswerQuestion={handleAnswer}
        onViewIssue={handleViewIssue}
        onViewSource={handleViewSource}
        {...project} />
    </Layout>
  );
};

export default Project;
