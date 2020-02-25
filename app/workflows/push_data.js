import Client from "../helpers/client";
import SubmissionPeriod from "../helpers/submission_period";
import Response from "../models/response";
import Content from "../models/content";
import ResponsePresenter from "../presenters/response_presenter";
import ContentPresenter from "../presenters/content_presenter";

const pushData = async () => {
  const responses = await ResponsePresenter.presentAll({ pushed: false });
  const contents = await ContentPresenter.presentAll({ pushed: false });

  if (responses.length === 0 && contents.length === 0) return false;

  const partitions = SubmissionPeriod.partitionMany({ responses, contents });
  await new Client().postMyUpdates(partitions);

  await Response.update({ pushed: true }, { ...whereIds(responses) });
  await Content.update({ pushed: true }, { ...whereIds(contents) });

  return true;
};

const whereIds = (presented) => (
  { where: { id: { [Op.or]: presented.map(r => r.localId) } } }
);

export default pushData;
