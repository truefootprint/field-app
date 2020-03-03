import Layout from "../components/layout";

const Issue = ({ navigation }) => {
  const color = navigation.getParam("color");
  const questionId = navigation.getParam("questionId");
  const issue = navigation.getParam("issue");

  return (
    <Layout>
      <Text>{color}</Text>
      <Text>{questionId}</Text>
      <Text>{JSON.stringify(issue)}</Text>
    </Layout>
  );
};

export default Issue;
