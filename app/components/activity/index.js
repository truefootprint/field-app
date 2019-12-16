import Topic from "../topic";
import Expander from "../expander";

const Activity = ({ color="blue", name, projectQuestions={ byTopic: [] } }) => {
  const counts = {};

  const topics = projectQuestions.byTopic.map(({ topic, projectQuestions }, i) => (
    <Topic key={i} color={color} {...topic} questions={projectQuestions} />
  ));

  return Expander({ color, text: name, children: topics });
};

export default Activity;
