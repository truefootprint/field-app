const innerText = (node) => {
  if (typeof node === "string") return node;
  if (typeof node === "number") return `${node}`;

  if (node.children) {
    const children = [node.children].flat();
    return children.map(c => innerText(c)).join("");
  }

  if (node.getByTestId) return innerText(node.toJSON());
  if (node.props) return innerText(node.props);

  return "";
};

export default innerText;
