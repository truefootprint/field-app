const innerContent = (node) => {
  if (!node) return "";
  if (node.content) return node.content;

  if (node.children) {
    const children = [node.children].flat();
    return children.map(c => innerContent(c)).join("");
  }
};

export default innerContent;
