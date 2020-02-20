const Resolve = ({ navigation }) => {
  const color = navigation.getParam("color");
  const questionId = navigation.getParam("questionId");
  const issue = navigation.getParam("issue");

  return (
    <ScrollView>
      <Text>resolve issue</Text>
    </ScrollView>
  );
};

export default Resolve;
