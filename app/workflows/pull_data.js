import Client from "../helpers/client";
import FileCache from "../helpers/file_cache";
import ResponsePresenter from "../presenters/response_presenter";

const pullData = async ({ connected=true, force, callback=()=>{} } = {}) => {
  const onMiss = () => connected && new Client().myData();
  const maxAge = force ? 0 : undefined;
  const myData = await FileCache.fetch("my_data.json", { onMiss, maxAge });

  const responses = await ResponsePresenter.presentAll();
  const combined = combineData(myData, responses);

  await callback(combined);
  return combined;
};

const combineData = (myData, responses) => {
  const groups = groupBy(responses, r => r.projectQuestionId);

  return mapNested(myData, o => {
    if (!o) return o;

    if (typeof o.projectQuestionId === "undefined") return o;
    if (typeof o.responses === "undefined") return o;

    const responses = groups[o.projectQuestionId] || [];
    o.responses = o.responses.concat(responses);

    return o;
  });
};

export default pullData;
export { combineData };
