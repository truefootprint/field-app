import Client from "../helpers/client";
import SubmissionPeriod from "../helpers/submission_period";
import Response from "../models/response";
import IssueNote from "../models/issue_note";
import ResponsePresenter from "../presenters/response_presenter";
import IssueNotePresenter from "../presenters/issue_note_presenter";

const pushData = async () => {
  const responses = await ResponsePresenter.presentAll({ pushed: false });
  const issueNotes = await IssueNotePresenter.presentAll({ pushed: false });

  if (responses.length === 0 && issueNotes.length === 0) return false;

  const partitions = SubmissionPeriod.partitionMany({ responses, issueNotes });
  await new Client().postMyUpdates(partitions);

  await Response.update({ pushed: true }, { ...whereIds(responses) });
  await IssueNote.update({ pushed: true }, { ...whereIds(issueNotes) });

  return true;
};

const whereIds = (presented) => (
  { where: { id: { [Op.or]: presented.map(r => r.localId) } } }
);

export default pushData;
