const createOrUpdate = async (model, { where, attributes }) => {
  let record = await model.findOne({ where });

  if (record) {
    await record.update(attributes);
  } else {
    record = await model.create(attributes);
  }

  return record;
};

export default createOrUpdate;
