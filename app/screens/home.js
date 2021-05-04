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
  8: require("../assets/images/project-id-8.jpg"),
  239: require("../assets/images/project-id-239.png"),
  255: require("../assets/images/east-timor-tb.jpg"),
  289: require("../assets/images/east-timor-tb.jpg"),
  290: require("../assets/images/east-timor-tb.jpg"),
  291: require("../assets/images/east-timor-tb.jpg"),
  292: require("../assets/images/east-timor-tb.jpg"),
  340: require("../assets/images/jackie-p-340.jpg"),
  341: require("../assets/images/jackie-p-341.jpg"),
  349: require("../assets/images/project-id-7.jpg"),
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

  const selectProjectImage = (id, projectTypeId) => {
    let result
    if (projectTypeId === 6) {
      result = images[7]
    } else if (id === 239) {
      result = images[239]
    } else {
      result = (images[id] || images._)
    }
    return result
  }

  const projectCard = ({ name, id, projectTypeId }, i) => (
    <Card key={i} color={palette.cycle(i)} heading={name} number={i + 1} outOf={projects.length}>
      <TouchableOpacity {...className("touchable")} onPress={handlePress(i)} activeOpacity={0.8}>
        <Image source={selectProjectImage(id, projectTypeId)} width={500} height={id === 8 ? 650 : 350} />
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
