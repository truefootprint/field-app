import RadioGroup, { Radio } from "../radio_group";

const MultiChoice = ({ color="blue", options=[] }) => {
  const radio = ({ key, value }) => (
    <Radio key={key}>
      <Text>{value}</Text>
    </Radio>
  );

  return (
    <RadioGroup color={color}>
      {options.map(radio)}
    </RadioGroup>
  );
};

export default MultiChoice;
