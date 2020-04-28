import Button from "../button";
import RoleListing from "../role_listing";
import styles from "./styles.js";

const Intro = ({ color="blue", project, page=1, onNextPage=()=>{}, onFinish=()=>{} }) => {
  const s = styles(color);
  const t = useTranslate();

  const [disabled, setDisabled] = useState(false);
  const [role, setRole] = useState();

  const markdown = t.intro[`page_${page + 1}`];
  const hasNextPage = markdown && markdown.length >= 10;

  const buttonText = hasNextPage ? t.intro.next_page : t.intro.finish;
  const handlePress = () => hasNextPage ? onNextPage(role) : onFinish(role);

  const resolveMarker = (node, children, parent, styles) => {
    if (innerContent(node) === "%{roles}") {
      return <RoleListing key={0} color={color} project={project} role={role} onSelect={setRole} disableSubmit={setDisabled} />
    }
  };

  return (
    <ScrollView {...className("intro", s)}>
      <Markdown style={s.markdown} rules={{ heading6: resolveMarker }}>
        {t.intro[`page_${page}`]}
      </Markdown>

      <View {...className("button")}>
        <Button color={color} caps={false} text={buttonText} onPress={handlePress} disabled={disabled} />
      </View>
    </ScrollView>
  );
};

export default Intro;
