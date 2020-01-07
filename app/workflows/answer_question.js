import Response from "../models/response";
import SubmissionPeriod from "../helpers/submission_period";

const answerQuestion = async ({ question, answer, callback=()=>{} }) => {
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

  await callback(response);
  return response;
};

export default answerQuestion;
