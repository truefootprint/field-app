import IssueForm from "../../components/issue_form";

const Edit = ({ navigation }) => {
  const color = navigation.getParam("color");

  return (
    <ScrollView><IssueForm color={color} /></ScrollView>
  );
};

export default Edit;
