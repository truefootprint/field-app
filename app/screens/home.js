import Card from "../components/card";
import Submit from "../components/submit";
import Checkbox from "../components/checkbox";
import Radio from "../components/radio";
import RadioGroup from "../components/radio_group";

const Home = ({ navigation }) => {
  const options = ["Yes", "No", "Not sure"];
  const [index, setIndex] = useState();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ width: 50, height: 50 }} />

      <Card color="blue" heading="Cement" number={1} outOf={3}>
        <Text>Does the cement float in water?</Text>

        <Submit color="blue" />
      </Card>

      <Card color="green" heading="Sizes and position" number={2} outOf={3}>
        <Text>Is the foundation going from gate to doorstep?</Text>

        <RadioGroup color="green" onChange={i => setIndex(i)}>
          <Radio>Yes</Radio>
          <Radio>No</Radio>
          <Radio>Not sure</Radio>
          <Checkbox onCheck={b => alert(`Issue: ${b}`)}>Report an issue</Checkbox>
        </RadioGroup>

        {typeof index === "undefined" ? null : <Text>Selected '{options[index]}'</Text>}
      </Card>

      <Card color="red" heading="Tiles" number={3} outOf={3}>
        <Text>Are the tiles black and white?</Text>
      </Card>
    </View>
  );
};

export default Home;
