import Layout from "../components/layout";
import PDF from "../components/pdf";
import Attachment from "../models/attachment";

const Source = ({ navigation }) => {
  const { file } = navigation.getParam("document");
  const page = navigation.getParam("page"); // TODO

  return <PDF uri={Fingerprint.path(file.md5, file.url)} />;
};

export default Source;
