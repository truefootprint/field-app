import Response from "../models/response";

const loadModels = async (callback, options = {}) => {
  const m = sequelize.models;

  Response.onLoad(m);

  await sequelize.sync(options);

  callback();
};

export default loadModels;
