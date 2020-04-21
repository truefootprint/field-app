import Button from "../button";
import styles from "./styles.js";

const Summary = ({ color="blue", projectName, hasContract, onViewContract=()=>{} }) => {
  const t = useTranslate();
  const s = styles(color);

  return (
    <View {...className("summary", s)}>
      <Text {...className("title")}>{projectName}</Text>
      <Text {...className("heading")}>{t.summary.title}</Text>
      <Text {...className("text")}>{t.summary.body}</Text>

      {hasContract &&
        <Button color={color} text={t.summary.contract} caps={false} fill={false} onPress={onViewContract} />
      }
    </View>
  );
};

export default Summary;
