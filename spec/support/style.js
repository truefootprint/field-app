import props from "./props";

const style = (node) => (
  props(node).style.reduce((obj, s) => ({ ...obj, ...s }), {})
);

export default style;
