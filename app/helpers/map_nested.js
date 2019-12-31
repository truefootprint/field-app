const mapNested = (node, fn) => {
  node = fn(node);

  if (node === null) return node;

  if (typeof node !== "object") return node;
  if (typeof node === "undefined") return node;
  if (node instanceof Date) return node;

  if (Array.isArray(node)) {
    return node.map(n => mapNested(n, fn));
  }

  let object = {};
  for (let [key, value] of Object.entries(node)) {
    object[key] = mapNested(value, fn);
  };

  return object;
};

export default mapNested;
