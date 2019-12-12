import Card from "../card";
import Question from "../question";

const Topic = ({ color="blue", name, questions=[] }) => (
  questions.map((props, i) => (
    <Card color={color} heading={name} key={i} number={i + 1} outOf={questions.length}>
      <Question color={color} {...props} />
    </Card>
  ))
);

export default Topic;
