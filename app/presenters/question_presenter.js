import ApplicationPresenter from "./application_presenter";
import TopicPresenter from "./topic_presenter";

class QuestionPresenter extends ApplicationPresenter {
  static async present_element(record) {
    const presented = await super.present_element(record)
    const topic = await record.getTopic();

    presented.topic = await TopicPresenter.present_element(topic);

    return presented;
  }
};

export default QuestionPresenter;
