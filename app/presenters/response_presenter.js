import ApplicationPresenter from "./application_presenter";
import Response from "../models/response";

class ResponsePresenter extends ApplicationPresenter {
  static model() {
    return Response;
  }
};

export default ResponsePresenter;
