import Layout from "../components/layout";
import Project from "../components/project";
import syncData from "../helpers/sync_data";

const Home = ({ navigation }) => {
  const [data, setData] = useState();

  useEffect(() => {
    syncData(setData);
  }, [])

  if (!data) return null

  return (
    <Layout>
      <Project {...data.projects[0]} />
    </Layout>
  );
};

export default Home;
