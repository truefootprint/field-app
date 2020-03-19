import Button from "../button";
import styles from "./styles.js";

const Summary = ({ color="blue", name, text, activityCount, hasContract, onViewContract=()=>{} }) => {
  const t = useTranslate();
  const s = styles(color);

  return (
    <View {...className("summary", s)}>
      <Text {...className("title")}>{name}</Text>

      {text && <>
        <Text {...className("heading")}>{t.project_summary}</Text>
        <Text {...className("text")}>{text}</Text>
      </>}

      {hasContract &&
        <Button color={color} text={t.project_contract} caps={false} fill={false} onPress={onViewContract} />
      }

      <Text {...className("activity_count")}>
        {t("n_activities", { n: activityCount })}:
      </Text>
    </View>
  );
};

export default Summary;
