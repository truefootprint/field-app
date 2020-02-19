import ButtonPanel from "../../components/button_panel";

const Show = ({ navigation }) => {
  const color = navigation.getParam("color");
  const questionId = navigation.getParam("questionId");
  const issue = navigation.getParam("issue");

  return <>
    <ScrollView>
      <Text>{issue.versionedContent.content}</Text>
    </ScrollView>

    <ButtonPanel buttons={[
      { color, text: "Update", caps: false },
      { color, text: "Resolve", caps: false },
    ]} />
  </>;
};

export default Show;
