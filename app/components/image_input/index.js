import moveImageToDocumentStorage from "../../workflows/move_image";
import Image from "react-native-fullwidth-image"
import ImagePicker from "../image_picker";
import File from "../../helpers/file";
import styles from "./styles.js";

const ImageInput = ({ color, placeholder, defaultImages=[], onChange=()=>{} }) => {
  const [images, setImages] = useState(defaultImages);

  const handlePick = async (image) => {
    await moveImageToDocumentStorage(image);
    const newImages = [...images, image];

    setImages(newImages);
    onChange(newImages);
  };

  const imageClasses = (i) => (
    ["image", i === images.length - 1 && "last_child"]
  );

  const imageSource = (image) => (
    {...image, uri: File.interpolate(image.uri)}
  )

  return (
    <View>
      {images.map((image, i) => (
        <Image source={imageSource(image)} key={i} {...className(imageClasses(i), styles)} />
      ))}

      <ImagePicker text={placeholder} onPick={handlePick} color={color} {...className("picker")} />
    </View>
  );
};

export default ImageInput;
