const Show = ({ navigation }) => {
  const color = navigation.getParam("color");
  const questionId = navigation.getParam("questionId");
  const issue = navigation.getParam("issue");

  return (
    <Text>{issue.description}</Text>
  );
};

export default Show;
