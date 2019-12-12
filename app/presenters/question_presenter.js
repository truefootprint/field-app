import ApplicationPresenter from "./application_presenter";
import TopicPresenter from "./topic_presenter";

class QuestionPresenter extends ApplicationPresenter {
  static async presentElement(record) {
    return {
      ...await super.presentElement(record),
      ...await super.presentNested("topic", TopicPresenter, () => record.getTopic()),
    };
  }
};

export default QuestionPresenter;
