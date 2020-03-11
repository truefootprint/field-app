import Layout from "../components/layout";
import IssueComponent from "../components/issue";
import addIssueNote from "../workflows/add_issue_note";
import pullData from "../workflows/pull_data";

const Issue = ({ navigation }) => {
  const { connected, data, setData } = useContext(AppContext);

  const color = navigation.getParam("color");
  const questionId = navigation.getParam("questionId");
  const uuidParam = navigation.getParam("issueUuid");

  const [issueUuid, setUuid] = useState(uuidParam);
  const [pathToIssue, setPath] = useState();
  const [issue, setIssue] = useState();

  useWhen([issueUuid], () => {
    setPath(objectPath(data, o => o && o.uuid === issueUuid));
  }, [data]);

  useWhen([pathToIssue], () => {
    setIssue(getAtPath(data, pathToIssue));
  });

  const handleNote = ({ text, photos }) => {
    addIssueNote({ connected, subjectType: "Question", subjectId: questionId, issue, text, photos, callback: rerender });
  };

  const rerender = (issueNote) => {
    pullData({ connected, callback: setData });
    if (!issueUuid) setUuid(issueNote.issueUuid);
  };

  return (
    <Layout>
      <IssueComponent
        color={color}
        currentUser={data.user}
        onNote={handleNote}
        {...(issue || {})} />
    </Layout>
  );
};

export default Issue;
