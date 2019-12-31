import Layout from "../components/layout";
import Project from "../components/project";
import useCombinedData from "../hooks/use_combined_data";
import answerQuestion from "../actions/answer_question";

const Home = ({ navigation }) => {
  const data = useCombinedData({ force: true });

  return (
    <Layout>
      {data && <Project {...data.projects[0]} onAnswerQuestion={answerQuestion} />}
    </Layout>
  );
};

export default Home;
