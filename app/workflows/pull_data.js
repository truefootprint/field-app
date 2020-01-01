import Client from "../helpers/client";
import FileCache from "../helpers/file_cache";
import ResponsePresenter from "../presenters/response_presenter";

const pullData = async ({ connected=true, callback=()=>{} } = {}) => {
  const onMiss = () => connected && new Client().myData();
  const myData = await FileCache.fetch("my_data.json", { onMiss });

  const responses = await ResponsePresenter.presentAll();
  const combined = combineData(myData, responses);

  await callback(combined);
  return combined;
};

const combineData = (myData, responses) => {
  const groups = groupBy(responses, r => r.questionId);

  return mapNested(myData, o => {
    if (!o) return o;

    if (typeof o.questionId === "undefined") return o;
    if (typeof o.responses === "undefined") return o;

    const responses = groups[o.questionId] || [];
    o.responses = o.responses.concat(responses);

    return o;
  });
};

export default pullData;
export { combineData };
