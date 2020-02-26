import Layout from "../../components/layout";
import Modal from "../../components/modal";
import Show from "./show";
import New from "./new";
import Edit from "./edit";
import Resolve from "./resolve";

const options = { headerMode: "none" };
const IssueStack = createStackNavigator({ Show, New, Edit, Resolve }, options);
const titles = {
  Show: "Issue",
  New: "Record an issue",
  Edit: "Record an issue",
  Resolve: "Resolve the issue",
};

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
