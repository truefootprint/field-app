import Button from "../button";
import Lightbox from "../lightbox";
import RadioGroup, { Radio } from "../radio_group";
import { Times } from "../svg_icon";
import styles from "./styles.js";

const IssueResolver = ({ color="blue", onResolve=()=>{} }) => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const t = useTranslate();

  const handleSubmit = () => {
    setVisible(false);

    if (index === 0) {
      onResolve();
    }
  };

  return (
    <View {...className("issue_resolver", styles(color))}>
      <Text {...className("prompt_text")}>{t.issue.is_it_resolved}</Text>

      <Button color={color} text={t.issue.yes_resolved} caps={false} onPress={() => setVisible(true)} />

      <Lightbox visible={visible} onDismiss={() => setVisible(false)}>
        <TouchableOpacity {...className("touchable")} onPress={() => setVisible(false)} activeOpacity={0.8}>
          <Times size={30} />
        </TouchableOpacity>

        <View {...className("lightbox")}>
          <Text {...className("confirm_text")}>
            {t.issue.are_you_sure}
          </Text>

          <RadioGroup color={color} onChange={i => setIndex(i)} defaultIndex={0}>
            <Radio>
              <Text>{t.yes}</Text>
            </Radio>

            <Radio>
              <Text>{t.cancel}</Text>
            </Radio>
          </RadioGroup>

          <View {...className("submit")}>
            <Button color={color} text={t.submit} onPress={handleSubmit} />
          </View>
        </View>
      </Lightbox>
    </View>
  );
};

export default IssueResolver;
