import ApplicationPresenter from "./application_presenter";
import Image from "../models/image";
import File from "../helpers/file";

class ImagePresenter extends ApplicationPresenter {
  static model() {
    return Image;
  }

  static async presentElement(record) {
    const attr = await super.presentElement(record);

    attr.uri = File.path(record.filename);
    attr.type = contentType(record.filename);

    renameField(attr, "id", "localId");
    renameField(attr, "filename", "name");

    return attr;
  }
};

const renameField = (attributes, oldName, newName) => {
  attributes[newName] = attributes[oldName];
  delete attributes[oldName];
}

const contentType = (filename) => {
  const extension = File.extension(filename);

  switch (extension) {
    case "jpg":
      return "image/jpeg";
    default:
      throw new Error("Unknown extension");
  }
};

export default ImagePresenter;
