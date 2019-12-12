import Topic from "../topic";
import Expander from "../expander";

const Activity = ({ color="blue", name, questions=[] }) => {
  const counts = {};
  const byTopic = chunk(questions, q => q.topic);

  const topics = byTopic.map(([topic, questions], i) => (
    <Topic key={i} color={color} name={topic.name} questions={questions} />
  ));

  return Expander({ color, text: name, children: topics });
};

export default Activity;
