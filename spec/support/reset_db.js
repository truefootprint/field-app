import { loadModels } from "../../app/components/model_loader";

const resetDB = async () => {
  const callback = () => {};
  const options = { force: true };

  await loadModels(callback, options);
};

export default resetDB;
