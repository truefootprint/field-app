import Layout from "../components/layout";
import seedDB from "../helpers/seed_db";

import ProjectModel from "../models/project";
import ProjectPresenter from "../presenters/project_presenter";
import ProjectComponent from "../components/project";

const Home = ({ navigation }) => {
  const [data, setData] = useState();

  useEffect(() => {
    seedDB().then(() => {
      ProjectModel.findAll().then(records => (
        ProjectPresenter.present(records[0]).then(presented => (
          setData(presented)
        ))
      ))
    })
  }, []);

  return data ? <ProjectComponent {...data} /> : null;
};

export default Home;
