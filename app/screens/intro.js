import Layout from "../components/layout";
import IntroComponent from "../components/intro";
import changeRole from "../workflows/change_role";

const Intro = ({ navigation }) => {
  const { data, connected } = useContext(AppContext);
  const t = useTranslate();

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
    if (role) { handleRole(role); return; }
    setPage(page + 1);
  };

  const handleFinish = (role) => {
    if (role) { handleRole(role); return; }
    navigation.navigate("Project", { projectIndex });
  };

  const handleRole = (role) => {
    connected ? changeRole({ role }) : alert(t.no_wifi);
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
