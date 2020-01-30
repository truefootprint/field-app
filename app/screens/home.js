import Image from "react-native-fullwidth-image"
import Layout from "../components/layout";
import Button from "../components/button";
import Card from "../components/card";

const image = require("../assets/images/splash-screen.png"); // TODO

const Home = ({ navigation }) => {
  const { data } = useContext(AppContext);
  const projects = data.projects;

  const handlePress = (index) => {
    return () => navigation.navigate("Project", { index });
  };

  const projectCard = ({ name }, i) => (
    <Card key={i} color={palette.cycle(i)} heading={name} number={i + 1} outOf={projects.length}>
      <TouchableOpacity {...className("touchable")} onPress={handlePress(i)} activeOpacity={0.8}>
        <Image source={image} width={500} height={500} />
      </TouchableOpacity>
    </Card>
  );

  return (
    <Layout>
      <View style={{ alignItems: "center" }}>
        {projects.map(projectCard)}
      </View>
    </Layout>
  );
};

export default Home;
