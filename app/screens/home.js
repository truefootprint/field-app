import Layout from "../components/layout";
import Project from "../components/project";
import useDataSync from "../hooks/use_data_sync";
import answerQuestion from "../workflows/answer_question";
import SyncMyDataTask from "../tasks/sync_my_data_task";

SyncMyDataTask.enable({ log: true }); // Runs when the app is backgrounded.

const Home = ({ navigation }) => {
  const [data, setData] = useState();

  const connected = useDataSync(({ connected }) => {
    SyncMyDataTask.runWith({ connected, force: true, callback: setData });

    (new Client()).postMyPhotos({
      uri: File.path("3c7fdb89de39f29765d46221746a0714.jpg"),
      name: "foo.jpg",
      type: "image/jpeg",
    });
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
