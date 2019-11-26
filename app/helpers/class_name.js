let styles;

const className = (name, s) => {
  if (s) styles = s;

  const props = { testID: name, accessibilityLabel: name };

  if (styles && styles[name]) {
    props.style = styles[name];
  }

  return props;
}

export default className;
