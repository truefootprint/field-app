import Response from "../models/response";
import SubmissionPeriod from "../helpers/submission_period";
import pushData from "./push_data";

const answerQuestion = async ({ connected, question, answer, callback=()=>{} }) => {
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

  // We could call SyncDataTask here but we don't want to pull myData after
  // answering every question as that's a lot of unnecessary network traffic.
  if (connected) await pushData();

  await callback(response);
  return response;
};

export default answerQuestion;
