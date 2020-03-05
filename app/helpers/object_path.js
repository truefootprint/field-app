const objectPath = (node, fn, path = []) => {
  if (fn(node)) return path;
  if (node === null) return;

  let p;

  if (typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      p = objectPath(value, fn, path.concat(key));
      if (p) return p;
    }
  }
};

const getAtPath = (node, path) => (
  path.reduce((acc, p) => acc[p], node)
);

export default objectPath;
export { getAtPath };
