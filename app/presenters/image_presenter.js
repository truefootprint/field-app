import ApplicationPresenter from "./application_presenter";
import Image from "../models/image";
import File from "../helpers/file";
import * as mime from "react-native-mime-types";

class ImagePresenter extends ApplicationPresenter {
  static model() {
    return Image;
  }

  static async presentElement(record) {
    const attr = await super.presentElement(record);

    attr.uri = File.path(record.filename);
    attr.type = mimeType(record.filename);

    renameField(attr, "id", "localId");
    renameField(attr, "filename", "name");

    return attr;
  }
};

const mimeType = (filename) => (
  mime.lookup(filename) || "application/octet-stream"
)

const renameField = (attributes, oldName, newName) => {
  attributes[newName] = attributes[oldName];
  delete attributes[oldName];
}

export default ImagePresenter;
