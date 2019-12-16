import Checkbox from "../checkbox";
import Button from "../button";
import MultiChoice from "./multi_choice";
import PhotoUpload from "./photo_upload";
import FreeText from "./free_text";
import styles from "./styles.js";

const Question = ({ color="blue", type, text, ...rest }) => {
  type = type && snakeCase(type).replace("_question", "");

  const inner = {
    multi_choice: <MultiChoice color={color} {...rest} />,
    photo_upload: <PhotoUpload color={color} {...rest} />,
    free_text: <FreeText color={color} {...rest} />,
  }[type];

  return (
    <View>
      <Text {...className("text", styles(color))}>{text}</Text>

      <View {...className(type)}>
        {inner}
      </View>

      <View {...className(`${type}_issue`)}>
        <Checkbox color={color}>Record an issue</Checkbox>
      </View>

      <Button text="Submit" color={color} />
    </View>
  );
};

export default Question;
