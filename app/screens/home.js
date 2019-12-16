import Layout from "../components/layout";
import Project from "../components/project";

const Home = ({ navigation }) => {
  const [data, setData] = useState();

  useEffect(() => {
    new Client().myData().then(setData)
  }, []);

  if (!data) return null

  return (
    <Layout>
      <Project {...data.projects[0]} />
    </Layout>
  );
};

export default Home;
