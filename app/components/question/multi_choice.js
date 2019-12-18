import RadioGroup, { Radio } from "../radio_group";

const MultiChoice = ({ color="blue", multiChoiceOptions=[], onAnswer=()=>{} }) => {
  const radio = ({ text }, i) => (
    <Radio key={i}>
      <Text>{text}</Text>
    </Radio>
  );

  const handleChange = (index) => {
    const option = multiChoiceOptions[index];

    onAnswer(option.id);
  };

  return (
    <RadioGroup color={color} onChange={handleChange}>
      {multiChoiceOptions.map(radio)}
    </RadioGroup>
  );
};

export default MultiChoice;
