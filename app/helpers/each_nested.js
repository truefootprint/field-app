const eachNested = async (node, fn) => {
  await fn(node);

  if (node === null) return;

  if (Array.isArray(node)) {
    for (const n of node) {
      await eachNested(n, fn);
    }

    return;
  }

  if (typeof node === "object") {
    for (const n of Object.values(node)) {
      await eachNested(n, fn)
    }
  }
};

export default eachNested;
