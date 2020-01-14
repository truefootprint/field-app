import Client from "../helpers/client";
import Image from "../models/image";
import ImagePresenter from "../presenters/image_presenter";

const uploadPhoto = async () => {
  const image = await ImagePresenter.presentOne({ pushed: false });
  if (!image) return false;

  await new Client().postMyPhotos(image);
  await Image.update({ pushed: true }, { where: { id: image.localId } });

  return true;
};

export default uploadPhoto;
