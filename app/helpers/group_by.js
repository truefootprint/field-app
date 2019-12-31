const groupBy = (collection, callback) => {
  return collection.reduce((groups, element) => {
    const key = callback(element);

    groups[key] = groups[key] || [];
    groups[key].push(element);

    return groups;
  }, {});
};

export default groupBy;
