import { loadModels } from "../components/model_loader";

const seedDB = async (callback=()=>{}) => {
  await loadModels(() => {}, { force: true });

  // Create records here.

  callback();
};

export default seedDB;
