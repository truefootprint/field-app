import Constants from "expo-constants";
import Image from "react-native-fullwidth-image"
import Layout from "../components/layout";
import Button from "../components/button";
import Card from "../components/card";
import Map from "../components/map";

const images = {
  2: require("../assets/images/project-id-2.jpg"),
  3: require("../assets/images/project-id-3.jpg"),
  4: require("../assets/images/project-id-4.jpg"),
  5: require("../assets/images/project-id-5.jpg"),
  _: require("../assets/images/project-id-2.jpg"),
};

const Home = ({ navigation }) => {
  const { data } = useContext(AppContext);
  const projects = data.projects;

  const handlePress = (index) => {
    return () => navigation.navigate("Project", { index });
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

        <Card number={1} outOf={1}><Map /></Card>

        <Text style={{ marginBottom: 20, color: "#ddd", fontSize: 12 }}>
          FieldApp version {Constants.manifest.version}
        </Text>
      </ScrollView>
    </Layout>
  );
};

export default Home;
