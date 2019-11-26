let styles = {};

const className = (names, s) => {
  if (s) styles = s;
  names = [names].flat().filter(n => n);

  const props = { testID: names[0], accessibilityLabel: names[0] };
  const style = names.map(n => styles[n]).filter(s => s);

  if (style.length > 0) {
    props.style = style;
  }

  return props;
}

export default className;
