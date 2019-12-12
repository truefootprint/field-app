import BasePresenter from "./base_presenter";
import TopicPresenter from "./topic_presenter";

const QuestionPresenter = {};

QuestionPresenter.present = async (record) => {
  const presented = BasePresenter.present(record);
  const topic = await record.getTopic();

  presented.topic = TopicPresenter.present(topic);

  return presented;
};

export default QuestionPresenter;
