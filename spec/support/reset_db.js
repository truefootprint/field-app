import loadModels from "../../app/helpers/load_models";

const resetDB = async () => {
  const callback = () => {};
  const options = { force: true };

  await loadModels(callback, options);
};

export default resetDB;
