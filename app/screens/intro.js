import Layout from "../components/layout";
import IntroComponent from "../components/intro";

const Intro = ({ navigation }) => {
  const pageParam = navigation.getParam("introPage");
  const projectIndex = navigation.getParam("projectIndex");

  const color = palette.cycle(projectIndex);
  const [page, setPage] = useState(parseInt(pageParam || 1, 10));

  const prevPage = () => setPage(page - 1);
  const nextPage = () => setPage(page + 1);
  const firstPage = page === 1;

  useBack(() => {
    if (firstPage) {
      useTranslate.unsetProject(); // Don't use project-specific translations.
      navigation.navigate("Home");
    } else {
      prevPage();
    }
  }, [page]);

  const handleFinish = () => {
    navigation.navigate("Project", { projectIndex });
  };

  return (
    <Layout>
      <ScrollView>
        <IntroComponent color={color} page={page} onNextPage={nextPage} onFinish={handleFinish} />
      </ScrollView>
    </Layout>
  );
};

export default Intro;
