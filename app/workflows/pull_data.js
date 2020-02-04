import Client from "../helpers/client";
import FileCache from "../helpers/file_cache";
import File from "../helpers/file";
import Response from "../models/response";
import Attachment from "../models/attachment";
import ResponsePresenter from "../presenters/response_presenter";

const pullData = async ({ connected=true, force, callback=()=>{} } = {}) => {
  let fetched = false;

  const onMiss = () => connected && fetchThenUpdateDatabase(f => fetched = f);
  const maxAge = force ? 0 : undefined;
  const myData = await FileCache.fetch("my_data.json", { onMiss, maxAge });

  const responses = await ResponsePresenter.presentAll();
  const combined = combineData(myData, responses);

  await callback(combined);
  return fetched;
};

// If the myData fetch succeeds, we can safely delete local responses that have
// been pushed to the backend as these will now appear in the API response.
const fetchThenUpdateDatabase = async (callback) => {
  const myData = await new Client().getMyData();

  await Response.destroy({ where: { pushed: true } });
  await createAttachments(myData);

  // Idea: We could check responses definitely appear in myData before deleting?

  callback(true);
  return myData;
};

const combineData = (myData, responses) => {
  const groups = groupBy(responses, r => r.projectQuestionId);

  return mapNested(myData, o => {
    if (isProjectQuestion(o)) {
      const responses = groups[o.id] || [];
      o.responses = o.responses.concat(responses);
    }

    return o;
  });
};

const createAttachments = async (myData) => {
  await eachNested(myData, async o => {
    if (isFileAttachment(o)) {
      const where = { md5: o.md5 };
      const attributes = { md5: o.md5, url: o.url };

      const attachment = await createOrUpdate(Attachment, { where, attributes });
      const fileExists = await File.exists(attachment.filename);

      if (fileExists && !attachment.pulled) {
        await attachment.update({ pulled: true });
      }
    }
  });
};

const isProjectQuestion = (o) => (
  o && typeof o.id !== "undefined" && typeof o.responses !== "undefined"
);

const isFileAttachment = (o) => (
  o && typeof o.md5 !== "undefined" && typeof o.url !== "undefined"
);

export default pullData;
export { combineData, createAttachments };
