import ApplicationPresenter from "./application_presenter";
import Content from "../models/content";

class ContentPresenter extends ApplicationPresenter {
  static model() {
    return Content;
  }

  static async presentElement(record) {
    const attr = await super.presentElement(record);

    renameField(attr, "id", "localId");
    parseSubjectType(attr);

    return attr;
  }
};

const renameField = (attributes, oldName, newName) => {
  attributes[newName] = attributes[oldName];
  delete attributes[oldName];
}

const parseSubjectType = (attributes) => {
  let subjectType = attributes.subjectType;

  subjectType = subjectType.replace("Question", "ProjectQuestion");

  if (subjectType.includes(",")) {
    subjectType = subjectType.split(",");
  }

  attributes.subjectType = subjectType;
}

export default ContentPresenter;
