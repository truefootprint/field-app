import Layout from "../../components/layout";
import Modal from "../../components/modal";
import Edit from "./edit";
import Show from "./show";

const options = { headerMode: "none" };
const IssueStack = createStackNavigator({ Edit, Show }, options);
const titles = { Edit: "Record an issue", Show: "title" };

const Issue = ({ navigation }) => {
  const { state } = navigation;
  const route = state.routes[state.index];

  const screen = route.routeName;
  const color = route.params.color;

  const back = () => navigation.goBack();

  return (
    <Layout>
      <Modal color={color} title={titles[screen]} onClose={back}>
        <IssueStack navigation={navigation} />
      </Modal>
    </Layout>
  );
};

Issue.router = IssueStack.router;

export default Issue;
