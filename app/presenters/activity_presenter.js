import ApplicationPresenter from "./application_presenter";
import QuestionPresenter from "./question_presenter";

class ActivityPresenter extends ApplicationPresenter {
  static async present_element(record) {
    return {
      ...await super.present_element(record),
      ...await super.present_nested("questions", QuestionPresenter, () => record.getQuestions()),
    };
  }
}

export default ActivityPresenter;
