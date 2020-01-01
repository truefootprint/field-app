import { loadModels } from "../workflows/load_app";

const seedDB = async (callback=()=>{}) => {
  await loadModels(() => {}, { force: true });

  // Create records here.

  callback();
};

export default seedDB;
