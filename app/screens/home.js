import Layout from "../components/layout";
import Project from "../components/project";
import useDataSync from "../hooks/use_data_sync";
import answerQuestion from "../workflows/answer_question";
import SyncDataTask from "../tasks/sync_data_task";

SyncDataTask.enable({ log: true }); // Runs when the app is backgrounded.

const Home = ({ navigation }) => {
  const [data, setData] = useState();

  const connected = useDataSync(({ connected }) => {
    SyncDataTask.runWith({ connected, force: true, callback: setData });
  });

  const handleAnswer = ({ question, answer }) => {
    answerQuestion({ connected, question, answer });
  };

  return (
    <Layout>
      {data && <Project {...data.projects[0]} onAnswerQuestion={handleAnswer} />}
    </Layout>
  );
};

export default Home;
