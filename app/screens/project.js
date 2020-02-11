import Layout from "../components/layout";
import ProjectComponent from "../components/project";
import answerQuestion from "../workflows/answer_question";

const Project = ({ navigation }) => {
  const { data, connected } = useContext(AppContext);

  const index = navigation.getParam("index");
  const project = data.projects[index];

  const handleAnswer = ({ question, answer }) => {
    answerQuestion({ connected, question, answer });
  };

  const handleIssueAction = ({ action, ...params }) => {
    navigation.navigate(action, params);
  };

  const handleSource = (sourceMaterial) => {
    navigation.navigate("Source", sourceMaterial);
  };

  return (
    <Layout>
      <ProjectComponent
        index={index}
        onAnswerQuestion={handleAnswer}
        onViewSource={handleSource}
        onIssueAction={handleIssueAction}
        {...project} />
    </Layout>
  );
};

export default Project;
