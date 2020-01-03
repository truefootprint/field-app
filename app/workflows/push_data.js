import Client from "../helpers/client";
import SubmissionPeriod from "../helpers/submission_period";
import Response from "../models/response";
import ResponsePresenter from "../presenters/response_presenter";

const pushData = async () => {
  const responses = await ResponsePresenter.presentAll();
  if (responses.length === 0) return false;

  const partitions = SubmissionPeriod.partition(responses, "responses");
  await new Client().myUpdates(partitions);

  Response.destroy({ where: {} });
  return true;
};

export default pushData;
