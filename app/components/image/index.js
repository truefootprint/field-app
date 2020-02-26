import FullWidthImage from "react-native-fullwidth-image"
import File from "../../helpers/file";

const Image = ({ source, ...props }) => {
  const newSource = {...source, uri: File.interpolate(source.uri) };

  return <FullWidthImage source={newSource} {...props} />
};

export default Image;
