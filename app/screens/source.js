import Layout from "../components/layout";
import Downloader from "../components/downloader";
import PDF from "../components/pdf";

const Source = ({ navigation }) => {
  const page = navigation.getParam("page"); // TODO: go to page number
  const document = navigation.getParam("document");
  const color = navigation.getParam("color");

  const file = document.file;
  const path = Fingerprint.path(file.md5, file.url);

  return (
    <Downloader color={color} path={path}>
      <PDF uri={path} />
    </Downloader>
  );
};

export default Source;
