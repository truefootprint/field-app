import RadioGroup, { Radio } from "../radio_group";
import CheckList, { Checkbox } from "../check_list";

const MultiChoice = ({ color="blue", response, multiChoiceOptions=[], multipleAnswers, onAnswer=()=>{} }) => {
  const optionsText = multiChoiceOptions.map(o => o.text);

  const defaultIds = response && [JSON.parse(response.value)].flat() || [];
  const defaultIndexes = filterIndex(multiChoiceOptions, o => contains(o.id, defaultIds));

  const onChange = (indexes) => {
    const ids = indexes.map(index => multiChoiceOptions[index].id);
    ids.sort((a, b) => a - b);

    const value = ids.length <= 1 ? (ids[0] || "") : JSON.stringify(ids);
    onAnswer(value);
  };

  const props = { color, defaultIndexes, optionsText, onChange };
  return multipleAnswers ? <MultipleAnswers {...props} /> : <SingleAnswer {...props} />;
};

const MultipleAnswers = ({ color, defaultIndexes, optionsText, onChange=()=>{} }) => (
  <CheckList color={color} onChange={onChange} defaultIndexes={defaultIndexes}>
    {optionsText.map((text, i) => (
      <Checkbox key={i}>
        <Text>{text}</Text>
      </Checkbox>
    ))}
  </CheckList>
);

const SingleAnswer = ({ color, defaultIndexes, optionsText, onChange=()=>{} }) => (
  <RadioGroup color={color} onChange={i => onChange([i])} defaultIndex={defaultIndexes[0]}>
    {optionsText.map((text, i) => (
      <Radio key={i}>
        <Text>{text}</Text>
      </Radio>
    ))}
  </RadioGroup>
);

export default MultiChoice;
