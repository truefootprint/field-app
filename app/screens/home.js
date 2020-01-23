import Layout from "../components/layout";
import Project from "../components/project";
import answerQuestion from "../workflows/answer_question";

const Home = ({ navigation }) => {
  const { data, connected } = useContext(AppContext);

  const handleAnswer = ({ question, answer }) => {
    answerQuestion({ connected, question, answer });
  };

  return (
    <Layout>
      <Project {...data.projects[0]} onAnswerQuestion={handleAnswer} />
    </Layout>
  );
};

export default Home;
