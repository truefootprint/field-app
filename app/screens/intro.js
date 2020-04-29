import Layout from "../components/layout";
import IntroComponent from "../components/intro";
import changeRole from "../workflows/change_role";

const Intro = ({ navigation }) => {
  const { data } = useContext(AppContext);

  const pageParam = navigation.getParam("introPage");
  const projectIndex = navigation.getParam("projectIndex");
  const project = data.projects[projectIndex];

  const color = palette.cycle(projectIndex);
  const [page, setPage] = useState(parseInt(pageParam || 1, 10));

  useBack(() => {
    if (page === 1) {
      useTranslate.unsetProject(); // Don't use project-specific translations.
      navigation.navigate("Home");
    } else {
      setPage(page - 1);
    }
  }, [page]);

  const handleNext = (role) => {
    if (role) { changeRole({ role }); return; }
    setPage(page + 1);
  };

  const handleFinish = (role) => {
    if (role) { changeRole({ role }); return; }
    navigation.navigate("Project", { projectIndex });
  };

  return (
    <Layout>
      <ScrollView>

        <IntroComponent
          color={color}
          project={project}
          page={page}
          onNextPage={handleNext}
          onFinish={handleFinish} />

      </ScrollView>
    </Layout>
  );
};

export default Intro;
