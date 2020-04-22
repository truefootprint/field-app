import Button from "../button";
import styles from "./styles.js";

const Intro = ({ color="blue", page=1, onNextPage=()=>{}, onFinish=()=>{} }) => {
  const s = styles(color);
  const t = useTranslate();

  const markdown = t.intro[`page_${page + 1}`];
  const hasNextPage = markdown && markdown.length >= 10;

  const buttonText = hasNextPage ? t.intro.next_page : t.intro.finish;
  const handlePress = () => hasNextPage ? onNextPage() : onFinish();

  return (
    <ScrollView {...className("intro", s)}>
      <Markdown style={s.markdown}>
        {t.intro[`page_${page}`]}
      </Markdown>

      <View {...className("button")}>
        <Button color={color} caps={false} text={buttonText} onPress={handlePress} />
      </View>
    </ScrollView>
  );
};

export default Intro;
