import Card from "../components/card";
import Submit from "../components/submit";
import Checkbox from "../components/checkbox";
import Radio from "../components/radio";
import RadioGroup from "../components/radio_group";

const Home = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <View style={{ width: 50, height: 50 }} />

    <Card color="blue" heading="Cement" number={1} outOf={3}>
      <Text>Does the cement float in water?</Text>

      <Submit color="blue" />
    </Card>

    <Card color="green" heading="Sizes and position" number={2} outOf={3}>
      <Text>Is the foundation going from gate to doorstep?</Text>

      <RadioGroup color="green">
        <Radio>Yes</Radio>
        <Radio checked>No</Radio>
        <Radio>Not sure</Radio>
        <Checkbox>Report an issue</Checkbox>
      </RadioGroup>
    </Card>

    <Card color="red" heading="Tiles" number={3} outOf={3}>
      <Text>Are the tiles black and white?</Text>
    </Card>
  </View>
);

export default Home;
