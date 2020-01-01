import { loadModels } from "../../app/workflows/load_app";

const resetDB = async () => {
  const callback = () => {};
  const options = { force: true };

  await loadModels(callback, options);
};

export default resetDB;
