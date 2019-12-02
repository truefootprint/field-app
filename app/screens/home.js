import Card from "../components/card";
import Button from "../components/button";
import Checkbox from "../components/checkbox";
import Radio from "../components/radio";
import RadioGroup from "../components/radio_group";
import TextInput from "../components/text_input";
import AddFile from "../components/add_file";

const Home = ({ navigation }) => {
  const options = ["Yes", "No", "Not sure"];
  const [index, setIndex] = useState();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ width: 50, height: 50 }} />

      <Card color="blue" heading="Cement" number={1} outOf={3}>
        <Text>Does the cement float in water?</Text>

        <View style={{ width: 10, height: 10 }} />
        <TextInput placeholder="Add a value" units="metres" />
        <View style={{ width: 10, height: 10 }} />

        <AddFile onAdd={() => alert("test")} />


        <Button text="Submit" color="blue" />
      </Card>

      <Card color="green" heading="Sizes and position" number={2} outOf={3}>
        <Text>Is the foundation going from gate to doorstep?</Text>

        <View style={{ width: 10, height: 10 }} />
        <TextInput placeholder="Add a comment" color="green" />
        <View style={{ width: 10, height: 10 }} />

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
