import Layout from "../components/layout";
import Project from "../components/project";
import answerQuestion from "../actions/answer_question";

import useDataSync from "../hooks/use_data_sync";
import FileCache from "../helpers/file_cache";
import ResponsePresenter from "../presenters/response_presenter";
import combineData from "../helpers/combine_data";

const Home = ({ navigation }) => {
  const [data, setData] = useState();

  useDataSync(async (connected) => {
    const onMiss = () => connected && new Client().myData();
    const myData = await FileCache.fetch("my_data.json", { onMiss });

    const responses = await ResponsePresenter.presentAll();
    const combined = combineData(myData, responses);

    setData(combined);
  });

  return (
    <Layout>
      {data && <Project {...data.projects[0]} onAnswerQuestion={answerQuestion} />}
    </Layout>
  );
};

export default Home;
