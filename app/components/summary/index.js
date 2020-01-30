import Button from "../button";
import styles from "./styles.js";

const Summary = ({ color="blue", name, text, activityCount }) => {
  const s = styles(color);

  return (
    <View {...className("summary", s)}>
      <Text {...className("title")}>{name}</Text>
      <Text {...className("heading")}>Project summary</Text>
      <Text {...className("text")}>{text}</Text>

      <Button color={color} text="Project contract" caps={false} fill={false} />

      <Text {...className("activity_count")}>
        This project has {activityCount} activities to monitor:
      </Text>
    </View>
  );
};

export default Summary;
