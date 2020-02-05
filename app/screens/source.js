import Layout from "../components/layout";
import PDF from "../components/pdf";
import Attachment from "../models/attachment";

const Source = ({ navigation }) => {
  const { file } = navigation.getParam("document");
  const page = navigation.getParam("page");

  const uri = File.path(`${file.md5}.${File.extension(file.url)}`);

  return <PDF uri={uri} />;
};

export default Source;
