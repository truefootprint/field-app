const styles = (theme) => StyleSheet.create({
  text: {
    color: theme.primary,
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.5,
  },

  white: {
    color: "white",
  },

  caps: {
    textTransform: "uppercase",
  },

  disabled: {
    opacity: 0.6,
  },
});

export default (color) => styles(palette[color]);
