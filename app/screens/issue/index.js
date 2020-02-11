import Layout from "../../components/layout";
import Modal from "../../components/modal";
import Edit from "./edit";

const options = { headerMode: "none" };
const IssueStack = createStackNavigator({ Edit }, options);
const titles = { Edit: "Record an issue" };

const Issue = ({ navigation }) => {
  const { state } = navigation;
  const routeName = state.routes[state.index].routeName;

  const color = navigation.getParam("color");
  const back = () => navigation.goBack();

  return (
    <Layout>
      <Modal color={color} title={titles[routeName]} onClose={back}>
        <IssueStack navigation={navigation} />
      </Modal>
    </Layout>
  );
};

Issue.router = IssueStack.router;

export default Issue;
