import innerText from "./inner_text";

const haveText = (node, expected, { exact = false } = {}) => {
  const actual = innerText(node);
  const pass = exact ? actual === expected : new RegExp(expected).test(actual);
  const word = exact ? "equal" : "match";

  return pass
    ? { pass, message: () => `expected '${actual}' not to ${word} '${expected}'` }
    : { pass, message: () => `expected '${actual}' to ${word} '${expected}'` };
};

export default haveText;
