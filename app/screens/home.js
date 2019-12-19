import Layout from "../components/layout";
import Project from "../components/project";
import useMyData from "../hooks/use_my_data";
import answerQuestion from "../actions/answer_question";

const Home = ({ navigation }) => {
  const myData = useMyData();
  if (!myData) return null;

  return (
    <Layout>
      <Project {...myData.projects[0]} onAnswerQuestion={answerQuestion} />
    </Layout>
  );
};

export default Home;
