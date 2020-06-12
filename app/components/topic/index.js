import Card from "../card";
import Question from "../question";

const Topic = ({ color="blue", name, questions=[], onAnswerQuestion=()=>{}, onViewIssue=()=>{} }) => {
  const { selectedOptions } = useContext(AppContext);

  const handleAnswer = (question) => {
    return (answer) => onAnswerQuestion({ question, answer });
  };

  return (
    questions.map((props, i) => {
      if (dependencyMet(selectedOptions, props.dependsOnMultipleChoiceOptions)) {
        return (
          <Card color={color} heading={name} key={i} number={i + 1} outOf={questions.length}>
            <Question color={color} onAnswer={handleAnswer(props)} onViewIssue={onViewIssue} {...props} />
          </Card>
        );
      }
    })
  );
};

const dependencyMet = (selectedOptions, dependsOnMultipleChoiceOptions) => {
  if (dependsOnMultipleChoiceOptions.length === 0) return true;

  for (const optionIds in Object.values(selectedOptions)) {
    if (dependsOnMultipleChoiceOptions.some(id => contains(id, optionIds))) {
      return true;
    }
  }
}

export default Topic;
