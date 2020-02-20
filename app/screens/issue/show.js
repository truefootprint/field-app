import ButtonPanel from "../../components/button_panel";

const Show = ({ navigation }) => {
  const color = navigation.getParam("color");
  const questionId = navigation.getParam("questionId");
  const issue = navigation.getParam("issue");

  if (!issue) return null;

  const action = (name) => {
    return () => navigation.navigate(name, { color, questionId, issue });
  };

  return <>
    <ScrollView>
      <Text>{issue.versionedContent.content}</Text>
    </ScrollView>

    <ButtonPanel buttons={[
      { color, text: "Update", caps: false, onPress: action("Edit") },
      { color, text: "Resolve", caps: false, onPress: action("Resolve") },
    ]} />
  </>;
};

export default Show;
