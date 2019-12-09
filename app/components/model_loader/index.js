import "../../models/question";

const loadModels = async (callback) => {
  await sequelize.sync();

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
