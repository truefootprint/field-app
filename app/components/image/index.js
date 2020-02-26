import FullWidthImage from "react-native-fullwidth-image"
import File from "../../helpers/file";
import Downloader from "../downloader";

const Image = ({ color="blue", source, ...props }) => {
  const newSource = {...source, uri: File.interpolate(source.uri) };

  return (
    <Downloader color={color} path={newSource.uri}>
      <FullWidthImage source={newSource} {...props} />
    </Downloader>
  );
};

export default Image;
