const eachNested = async (node, fn) => {
  await fn(node);

  if (node === null) return;

  if (Array.isArray(node)) {
    node.forEach(n => eachNested(n, fn));
    return;
  }

  if (typeof node === "object") {
    Object.values(node).forEach(n => eachNested(n, fn));
  }
};

export default eachNested;
