import Layout from "../components/layout";
import Project from "../components/project";
import useDataSync from "../hooks/use_data_sync";
import pullData from "../workflows/pull_data";
import pushData from "../workflows/push_data";
import answerQuestion from "../workflows/answer_question";

const Home = ({ navigation }) => {
  const [data, setData] = useState();

  useDataSync(HOF(pullData, { callback: setData }));

  useEffect(() => { pushData(); }); // TODO: when should this workflow run?

  return (
    <Layout>
      {data && <Project {...data.projects[0]} onAnswerQuestion={answerQuestion} />}
    </Layout>
  );
};

export default Home;
