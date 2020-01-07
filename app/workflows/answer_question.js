import Response from "../models/response";
import SubmissionPeriod from "../helpers/submission_period";
import pushData from "./push_data";

const answerQuestion = async ({ question, answer, connected, callback=()=>{} }) => {
  const response = await createOrUpdate(Response, {
    where: {
      questionId: question.id,
      createdAt: {
        [Op.gte]: SubmissionPeriod.startedAt(),
      },
    },
    attributes: {
      questionId: question.id,
      value: answer,
      pushed: false,
    },
  });

  if (connected) {
    await pushData();
  } else {
    // TODO: schedule background task
  }

  await callback(response);
  return response;
};

export default answerQuestion;
