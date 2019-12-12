// Based on https://apidock.com/ruby/Enumerable/chunk

const chunk = (array, condition) => {
  const chunks = [];

  array.forEach(element => {
    const value = condition(element);
    const last = chunks[chunks.length - 1];

    if (last && last[0] === value) {
      last[1].push(element);
    } else {
      chunks.push([value, [element]]);
    }
  });

  return chunks;
};

export default chunk;
