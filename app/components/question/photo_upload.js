import ImageInput from "../image_input";

const PhotoUpload = ({ color="blue", onAnswer=()=>{} }) => {
  const handleChange = (image) => {
    onAnswer(image[0].uri); // TODO
  };

  return (
    <ImageInput color={color} onChange={handleChange} />
  );
};

export default PhotoUpload;
