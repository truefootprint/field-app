import ApplicationPresenter from "./application_presenter";
import Response from "../models/response";

class ResponsePresenter extends ApplicationPresenter {
  static model() {
    return Response;
  }

  static async presentElement(record) {
    const attr = await super.presentElement(record);

    renameField(attr, "id", "localId");
    renameField(attr, "questionId", "projectQuestionId");

    return attr;
  }
};

const renameField = (attributes, oldName, newName) => {
  attributes[newName] = attributes[oldName];
  delete attributes[oldName];
}

export default ResponsePresenter;
