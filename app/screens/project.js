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

  return (
    <Layout>
      <ProjectComponent index={index} {...project} onAnswerQuestion={handleAnswer} />
    </Layout>
  );
};

export default Project;
