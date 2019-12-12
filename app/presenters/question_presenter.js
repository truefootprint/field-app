import ApplicationPresenter from "./application_presenter";
import TopicPresenter from "./topic_presenter";

class QuestionPresenter extends ApplicationPresenter {
  static async present(record) {
    const presented = super.present(record)
    const topic = await record.getTopic();

    presented.topic = TopicPresenter.present(topic);

    return presented;
  }
};

export default QuestionPresenter;
