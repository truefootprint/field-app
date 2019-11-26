const props = (node) => {
  if (node.props) return node.props;
  if (node.getByTestId) return props(node.toJSON());
};

export default props;
