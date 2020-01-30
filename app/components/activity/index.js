import Topic from "../topic";
import Expander from "../expander";

const Activity = ({ color="blue", name, isCurrent=false, projectQuestions={ byTopic: [] }, onAnswerQuestion=()=>{} }) => {
  const counts = {};

  const topics = projectQuestions.byTopic.map(({ topic, projectQuestions }, i) => (
    <Topic key={i} color={color} questions={projectQuestions} onAnswerQuestion={onAnswerQuestion} {...topic} />
  ));

  return Expander({ color, text: name, children: topics, expanded: isCurrent });
};

export default Activity;
