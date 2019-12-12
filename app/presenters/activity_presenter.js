import BasePresenter from "./base_presenter";
import QuestionPresenter from "./question_presenter";

const ActivityPresenter = {};

ActivityPresenter.present = async (record) => {
  const presented = BasePresenter.present(record);
  const questions = await record.getQuestions();
  const promises = questions.map(q => QuestionPresenter.present(q));

  presented.questions = await Promise.all(promises);

  return presented;
};

export default ActivityPresenter;
