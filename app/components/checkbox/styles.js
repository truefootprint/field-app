const styles = (theme) => StyleSheet.create({
  square: {
    width: 20,
    height: 20,
    backgroundColor: "white",
    borderColor: theme.primary,
    borderWidth: thin,
    alignItems: "center",
    justifyContent: "center",
  },

  disabled_square: {
    backgroundColor: palette.grey.primaryTint,
    borderWidth: 0,
  },

  tick: {
    color: palette.black.primary,
  },

  disabled_tick: {
    color: "white",
  },

  text: {
    marginLeft: 20,
    marginBottom: 1,
    color: theme.primary,
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.5,
  },

  white: {
    color: "white",
  },

  grey: {
    color: palette.grey.primary,
  }
});

export default (color) => styles(palette[color]);
