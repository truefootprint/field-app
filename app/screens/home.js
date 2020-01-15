import Layout from "../components/layout";
import Project from "../components/project";
import useDataSync from "../hooks/use_data_sync";
import answerQuestion from "../workflows/answer_question";
import SyncMyDataTask from "../tasks/sync_my_data_task";
import PhotoUploadTask from "../tasks/photo_upload_task";

// These tasks run every 15 minutes when the app is in the background.
SyncMyDataTask.enable({ log: true });
PhotoUploadTask.enable({ log: true });

const Home = ({ navigation }) => {
  const [data, setData] = useState();

  const connected = useDataSync(({ connected }) => {
    SyncMyDataTask.runWith({ connected, force: true, callback: setData });
    PhotoUploadTask.runWith({ connected });
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
