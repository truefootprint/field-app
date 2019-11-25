const innerText = (node) => {
  if (typeof node === "string") return node;
  if (typeof node === "number") return `${node}`;

  if (node.props) {
    const children = [node.props.children].flat();
    return children.map(c => innerText(c)).join("");
  }

  return "";
};

export default innerText;
