import RadioGroup, { Radio } from "../radio_group";

const MultiChoice = ({ color="blue", multiChoiceOptions=[], response, onAnswer=()=>{} }) => {
  const defaultId = response && parseInt(response.value, 10);

  // TODO: add support for multiple selections
  const defaultIndex = filterIndex(multiChoiceOptions, o => o.id === defaultId)[0];

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
    <RadioGroup color={color} onChange={handleChange} defaultIndex={defaultIndex}>
      {multiChoiceOptions.map(radio)}
    </RadioGroup>
  );
};

export default MultiChoice;
