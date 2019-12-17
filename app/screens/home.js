import Layout from "../components/layout";
import Project from "../components/project";
import syncData from "../helpers/sync_data";
import useForeground from "../hooks/use_foreground";
import useWifi from "../hooks/use_wifi";

const Home = ({ navigation }) => {
  const [data, setData] = useState();

  useWifi(() => { syncData(setData); });
  useForeground(() => { syncData(setData); });

  if (!data) return null

  return (
    <Layout>
      <Project {...data.projects[0]} />
    </Layout>
  );
};

export default Home;
