import RadioGroup, { Radio } from "../radio_group";
import CheckList, { Checkbox } from "../check_list";
import Image from "react-native-fullwidth-image";
import { host } from "../../../config/host.json";
import { View } from "react-native";
//field-app/config/host.json

const MultiChoice = ({ color="blue", response, multiChoiceOptions=[], multipleAnswers, onAnswer=()=>{} }) => {
  const optionsTextAndPhoto = multiChoiceOptions.map(o => ({photo: o.photo, text: o.text}));
  console.log("THE IMAGES AND PHOTOS");
  console.log(optionsTextAndPhoto);
  const defaultIds = response && [JSON.parse(response.value)].flat() || [];
  const defaultIndexes = filterIndex(multiChoiceOptions, o => contains(o.id, defaultIds));

  const onChange = (indexes) => {
    const ids = indexes.map(index => multiChoiceOptions[index].id);
    ids.sort((a, b) => a - b);

    const value = ids.length <= 1 ? (ids[0] || "") : JSON.stringify(ids);
    onAnswer(value);
  };

  const props = { color, defaultIndexes, optionsTextAndPhoto, onChange };
  return multipleAnswers ? <MultipleAnswers {...props} /> : <SingleAnswer {...props} />;
};

const MultipleAnswers = ({ color, defaultIndexes, optionsTextAndPhoto, onChange=()=>{} }) => (
  <CheckList color={color} onChange={onChange} defaultIndexes={defaultIndexes}>
    {optionsTextAndPhoto.map((obj, i) => (
      <View  key={i}>
      <Checkbox>
        <Text>{obj.text}</Text>
      </Checkbox>
      {obj.photo !== undefined &&
        <Image color={color} source={{uri: `${host}/${obj.photo}`}}/>
      }       
       </View>
    ))}
  </CheckList>
);

const SingleAnswer = ({ color, defaultIndexes, optionsTextAndPhoto, onChange=()=>{} }) => (
  <RadioGroup color={color} onChange={i => onChange([i])} defaultIndex={defaultIndexes[0]}>
    {optionsTextAndPhoto.map((obj, i) => (
      <View key={i}>
      <Radio>
        <Text>{obj.text}</Text>
      </Radio>
      {obj.photo !== undefined &&
        <Image color={color} source={{uri: `${host}/${obj.photo}`}}/>
      }
      </View>
    ))}
  </RadioGroup>
);

export default MultiChoice;