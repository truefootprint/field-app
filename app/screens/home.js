import Card from "../components/card";
import Button from "../components/button";
import Checkbox from "../components/checkbox";
import Radio from "../components/radio";
import RadioGroup from "../components/radio_group";
import TextInput from "../components/text_input";
import ImageInput from "../components/image_input";
import Question from "../components/question";

const Home = ({ navigation }) => {
  const options = [{ key: "yes", value: "Yes" }, { key: "no", value: "No" }];
  const [index, setIndex] = useState();

  return (
    <ScrollView>
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ width: 30, height: 30 }} />

      <Card color="blue" heading="Cement" number={1} outOf={4}>
        <Question text="Does the cement float in water?" type="multi_choice" options={options} />
      </Card>

      <Card color="blue" heading="Cement" number={2} outOf={4}>
        <Question text="How wide is the path?" type="free_text" placeholder="Add a width" units="metres" />
      </Card>

      <Card color="blue" heading="Cement" number={3} outOf={4}>
        <Question text="Add a photo" type="photo_upload" />
      </Card>

      <Card color="blue" heading="Cement" number={4} outOf={4}>
        <Question text="Do you have any other comments?" type="free_text" placeholder="Add a comment" />
      </Card>

      <View style={{ width: 30, height: 100 }} />
    </View>
    </ScrollView>
  );
};

export default Home;
