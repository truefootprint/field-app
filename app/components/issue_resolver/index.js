import Button from "../button";
import Lightbox from "../lightbox";
import RadioGroup, { Radio } from "../radio_group";
import { Times } from "../svg_icon";
import styles from "./styles.js";

const IssueResolver = ({ color="blue", onResolve=()=>{} }) => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const handleSubmit = () => {
    setVisible(false);

    if (index === 0) {
      onResolve();
    }
  };

  return (
    <View {...className("issue_resolver", styles(color))}>
      <Text {...className("prompt_text")}>Is this issue resolved?</Text>

      <Button color={color} text="Yes, it’s resolved" caps={false} onPress={() => setVisible(true)} />

      <Lightbox visible={visible} onDismiss={() => setVisible(false)}>
        <TouchableOpacity {...className("touchable")} onPress={() => setVisible(false)} activeOpacity={0.8}>
          <Times size={30} />
        </TouchableOpacity>

        <View {...className("lightbox")}>
          <Text {...className("confirm_text")}>
            Are you sure this issue is resolved?
          </Text>

          <RadioGroup color={color} onChange={i => setIndex(i)} defaultIndex={0}>
            <Radio>
              <Text>Yes</Text>
            </Radio>

            <Radio>
              <Text>Cancel</Text>
            </Radio>
          </RadioGroup>

          <View {...className("submit")}>
            <Button color={color} text="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </Lightbox>
    </View>
  );
};

export default IssueResolver;
