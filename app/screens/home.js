import Layout from "../components/layout";
import Project from "../components/project";
import useDataSync from "../hooks/use_data_sync";
import pullData from "../workflows/pull_data";
import pushData from "../workflows/push_data";
import answerQuestion from "../workflows/answer_question";

const Home = ({ navigation }) => {
  const [data, setData] = useState();

  useDataSync(options => {
    pushData().then(() => {
      pullData({ ...options, callback: setData, force: true });
    });
  });

  return (
    <Layout>
      {data && <Project {...data.projects[0]} onAnswerQuestion={answerQuestion} />}
    </Layout>
  );
};

export default Home;
