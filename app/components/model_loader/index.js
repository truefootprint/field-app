import Project from "../../models/project";
import Activity from "../../models/activity";
import Question from "../../models/question";
import Topic from "../../models/topic";

const loadModels = async (callback, options = {}) => {
  const m = sequelize.models;

  Project.onLoad(m);
  Activity.onLoad(m);
  Question.onLoad(m);
  Topic.onLoad(m);

  await sequelize.sync(options);

  callback();
};

const ModelLoader = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadModels(() => setLoaded(true))
  }, []);

  return loaded ? children : null;
};

export default ModelLoader;
export { loadModels };
