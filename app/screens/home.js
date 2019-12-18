import Layout from "../components/layout";
import Project from "../components/project";
import useMyData from "../hooks/use_my_data";

const Home = ({ navigation }) => {
  const myData = useMyData();
  if (!myData) return null;

  const handleAnswer = ({ question, answer }) => {
    console.log("answer:", answer);
  };

  return (
    <Layout>
      <Project {...myData.projects[0]} onAnswerQuestion={handleAnswer} />
    </Layout>
  );
};

export default Home;
