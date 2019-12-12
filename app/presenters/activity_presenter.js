import ApplicationPresenter from "./application_presenter";
import QuestionPresenter from "./question_presenter";

class ActivityPresenter extends ApplicationPresenter {
  static async presentElement(record) {
    return {
      ...await super.presentElement(record),
      ...await super.presentNested("questions", QuestionPresenter, () => record.getQuestions()),
    };
  }
}

export default ActivityPresenter;
