import Image from "react-native-fullwidth-image"
import Layout from "../components/layout";
import Button from "../components/button";
import Card from "../components/card";
import Map from "../components/map";
import Version from "../components/version";
import { navigateToIntro } from "../workflows/change_role";

// TODO: make this data driven, e.g. add image attachments to projects
const images = {
  3: require("../assets/images/project-id-3.jpg"),
  4: require("../assets/images/project-id-4.jpg"),
  5: require("../assets/images/project-id-5.jpg"),
  6: require("../assets/images/project-id-6.jpg"),
  7: require("../assets/images/project-id-7.jpg"),
  _: require("../assets/images/project-id-3.jpg"),
};

const Home = ({ navigation }) => {
  const { data } = useContext(AppContext);
  const projects = data.projects;

  useEffect(() => { navigateToIntro({ navigation, projects }); }, []);

  const handlePress = (projectIndex) => {
    return () => {
      useTranslate.setProject(projects[projectIndex]); // Use the project-specific translations.
      navigation.navigate("Intro", { introPage: 1, projectIndex });
    }
  };

  const projectCard = ({ name, id }, i) => (
    <Card key={i} color={palette.cycle(i)} heading={name} number={i + 1} outOf={projects.length}>
      <TouchableOpacity {...className("touchable")} onPress={handlePress(i)} activeOpacity={0.8}>
        <Image source={images[id] || images._} width={500} height={350} />
      </TouchableOpacity>
    </Card>
  );

  return (
    <Layout>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {projects.map(projectCard)}
        <Version />
      </ScrollView>
    </Layout>
  );
};

export default Home;
