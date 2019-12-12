import Layout from "../components/layout";
import Sticky from "../components/sticky";
import Card from "../components/card";
import Question from "../components/question";
import Expander from "../components/expander";
import Topic from "../components/topic";
import Activity from "../components/activity";

const Home = ({ navigation }) => {
  const options = [{ key: "yes", value: "Yes" }, { key: "no", value: "No" }];
  const [index, setIndex] = useState();

  const content = (color) => <>
    <Card color={color} heading="Cement" number={1} outOf={4}>
      <Question color={color} text="Does the cement float in water?" type="multi_choice" options={options} />
    </Card>

    <Card color={color} heading="Cement" number={2} outOf={4}>
      <Question color={color} text="How wide is the path?" type="free_text" placeholder="Add a width" units="metres" />
    </Card>

    <Card color={color} heading="Cement" number={3} outOf={4}>
      <Question color={color} text="Add a photo" type="photo_upload" />
    </Card>

    <Card color={color} heading="Cement" number={4} outOf={4}>
      <Question color={color} text="Do you have any other comments?" type="free_text" placeholder="Add a comment" />
    </Card>
  </>;

  const questions = [
    { text: "question text", type: "free_text", placeholder: "Add a value", units: "metres", topic: { name: "foo"} },
  ];

  return (
    <Layout>
      <Sticky.Container>

        {Expander({ color: "green", text: "Sticky header 1", children: content("green") })}
        {Expander({ color: "red", text: "Sticky header 2", children: content("red") })}
        {Expander({ color: "purple", text: "Sticky header 3", children: content("purple") })}
        {Expander({ color: "blue", text: "Sticky header 4", children: content("blue") })}

        {Activity({ color: "purple", name: "activity name", questions })}

      </Sticky.Container>
    </Layout>
  );
};

export default Home;
