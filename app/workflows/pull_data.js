import Client from "../helpers/client";
import FileCache from "../helpers/file_cache";
import ResponsePresenter from "../presenters/response_presenter";
import combineData from "../helpers/combine_data";

const pullData = async ({ connected=true, callback=()=>{} } = {}) => {
  const onMiss = () => connected && new Client().myData();
  const myData = await FileCache.fetch("my_data.json", { onMiss });

  const responses = await ResponsePresenter.presentAll();
  const combined = combineData(myData, responses);

  await callback(combined);
  return combined;
};

export default pullData;
