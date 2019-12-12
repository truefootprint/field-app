import ApplicationPresenter from "./application_presenter";
import TopicPresenter from "./topic_presenter";

class QuestionPresenter extends ApplicationPresenter {
  static async present_element(record) {
    return {
      ...await super.present_element(record),
      ...await super.present_nested("topic", TopicPresenter, () => record.getTopic()),
    };
  }
};

export default QuestionPresenter;
