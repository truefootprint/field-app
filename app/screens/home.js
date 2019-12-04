import Layout from "../components/layout";
import Sticky from "../components/sticky";
import Card from "../components/card";
import Question from "../components/question";

const Home = ({ navigation }) => {
  const options = [{ key: "yes", value: "Yes" }, { key: "no", value: "No" }];
  const [index, setIndex] = useState();

  return (
    <Layout>
      <Sticky.Container>
        <Sticky><Text>sticky header 1</Text></Sticky>

        <Card color="blue" heading="Cement" number={1} outOf={4}>
          <Question text="Does the cement float in water?" type="multi_choice" options={options} />
        </Card>

        <Card color="blue" heading="Cement" number={2} outOf={4}>
          <Question text="How wide is the path?" type="free_text" placeholder="Add a width" units="metres" />
        </Card>

        <Sticky><Text>sticky header 2</Text></Sticky>

        <Card color="blue" heading="Cement" number={3} outOf={4}>
          <Question text="Add a photo" type="photo_upload" />
        </Card>

        <Card color="blue" heading="Cement" number={4} outOf={4}>
          <Question text="Do you have any other comments?" type="free_text" placeholder="Add a comment" />
        </Card>
      </Sticky.Container>
    </Layout>
  );
};

export default Home;
