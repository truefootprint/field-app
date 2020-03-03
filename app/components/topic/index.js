import Card from "../card";
import Question from "../question";

const Topic = ({ color="blue", name, questions=[], onAnswerQuestion=()=>{}, onViewIssue=()=>{} }) => {
  const handleAnswer = (question) => {
    return (answer) => onAnswerQuestion({ question, answer });
  };

  return (
    questions.map((props, i) => (
      <Card color={color} heading={name} key={i} number={i + 1} outOf={questions.length}>
        <Question color={color} onAnswer={handleAnswer(props)} onViewIssue={onViewIssue} {...props} />
      </Card>
    ))
  );
};

export default Topic;
