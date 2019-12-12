import Topic from "../../models/topic";
import Question from "../../models/question";

const loadModels = async (callback, options = {}) => {
  Topic.onLoad(sequelize.models);
  Question.onLoad(sequelize.models);

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
