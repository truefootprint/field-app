import ApplicationPresenter from "./application_presenter";
import Response from "../models/response";

class ResponsePresenter extends ApplicationPresenter {
  static model() {
    return Response;
  }

  static async presentElement(record) {
    const attr = await super.presentElement(record);

    return {
      projectQuestionId: attr.questionId,
      value: attr.value,
      createdAt: attr.createdAt,
      updatedAt: attr.updatedAt,
    };
  }
};

export default ResponsePresenter;
