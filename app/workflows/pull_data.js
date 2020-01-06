import Client from "../helpers/client";
import FileCache from "../helpers/file_cache";
import Response from "../models/response";
import ResponsePresenter from "../presenters/response_presenter";

const pullData = async ({ connected=true, force, callback=()=>{} } = {}) => {
  const onMiss = () => connected && fetchThenCleanupResponses();
  const maxAge = force ? 0 : undefined;
  const myData = await FileCache.fetch("my_data.json", { onMiss, maxAge });

  const responses = await ResponsePresenter.presentAll();
  const combined = combineData(myData, responses);

  await callback(combined);
  return combined;
};

// If the myData fetch succeeds, we can safely delete local responses that have
// been pushed to the backend as these will now appear in the API response.
const fetchThenCleanupResponses = async () => {
  const myData = await new Client().myData();
  await Response.destroy({ where: { pushed: true } });

  // Idea: We could check responses definitely appear in myData before deleting?

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

const isProjectQuestion = (o) => (
  o && typeof o.id !== "undefined" && typeof o.responses !== "undefined"
)

export default pullData;
export { combineData };
