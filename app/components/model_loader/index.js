import "../../models/question";

const loadModels = async (callback, options = {}) => {
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
