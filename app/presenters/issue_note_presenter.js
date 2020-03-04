import ApplicationPresenter from "./application_presenter";
import IssueNote from "../models/issue_note";

class IssueNotePresenter extends ApplicationPresenter {
  static model() {
    return IssueNote;
  }

  static async presentElement(record) {
    const attr = await super.presentElement(record);

    renameField(attr, "id", "localId");
    parseSubjectType(attr);
    parseResolved(attr);

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

const parseResolved = (attributes) => {
  let resolved = attributes.resolved;

  if (typeof resolved === "number") {
    resolved = resolved === 1 ? true : false;
  }

  attributes.resolved = resolved;
};

export default IssueNotePresenter;
