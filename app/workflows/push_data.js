import Client from "../helpers/client";
import SubmissionPeriod from "../helpers/submission_period";
import Response from "../models/response";
import ResponsePresenter from "../presenters/response_presenter";

const pushData = async () => {
  const responses = await ResponsePresenter.presentAll({ pushed: false });
  if (responses.length === 0) return false;

  const partitions = SubmissionPeriod.partition(responses, "responses");
  await new Client().postMyUpdates(partitions);

  const where = { id: { [Op.or]: responses.map(r => r.localId) } };
  await Response.update({ pushed: true }, { where });

  return true;
};

export default pushData;
