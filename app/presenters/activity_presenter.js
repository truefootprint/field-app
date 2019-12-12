import ApplicationPresenter from "./application_presenter";
import QuestionPresenter from "./question_presenter";

class ActivityPresenter extends ApplicationPresenter {
  static async present_element(record) {
    const presented = await super.present_element(record)
    const questions = await record.getQuestions();
    const promises = questions.map(q => QuestionPresenter.present(q));

    presented.questions = await Promise.all(promises);

    return presented;
  }
}

export default ActivityPresenter;
