const minBy = (collection, callback) => {
  let minValue, minObject;

  for (let object of collection) {
    const value = callback(object);

    if (typeof minValue === "undefined" || value < minValue) {
      minValue = value;
      minObject = object;
    }
  }

  return minObject;
};

const maxBy = (collection, callback) => (
  minBy(collection, o => -callback(o))
);

export { minBy, maxBy };
