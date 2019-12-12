import Activity from "../../models/activity";
import Question from "../../models/question";
import Topic from "../../models/topic";

const loadModels = async (callback, options = {}) => {
  Activity.onLoad(sequelize.models);
  Question.onLoad(sequelize.models);
  Topic.onLoad(sequelize.models);

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
