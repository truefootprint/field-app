import RadioGroup, { Radio } from "../radio_group";

const MultiChoice = ({ color="blue", multiChoiceOptions=[] }) => {
  const radio = ({ id, text }) => (
    <Radio key={id}>
      <Text>{text}</Text>
    </Radio>
  );

  return (
    <RadioGroup color={color}>
      {multiChoiceOptions.map(radio)}
    </RadioGroup>
  );
};

export default MultiChoice;
