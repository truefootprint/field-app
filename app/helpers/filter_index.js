const filterIndex = (array, condition) => {
  const indices = [];

  array.forEach((element, index) => {
    if (condition(element)) {
      indices.push(index);
    }
  });

  return indices;
};

export default filterIndex;
