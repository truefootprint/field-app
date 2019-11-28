const styles = (theme) => StyleSheet.create({
  square: {
    width: 20,
    height: 20,
    backgroundColor: "white",
    borderColor: theme.primary,
    borderWidth: thin,
  },

  filled: {
    backgroundColor: palette.black.primary,
    borderColor: "white",
    borderWidth: 4,
  },

  text: {
    marginLeft: 20,
    marginBottom: 1,
    color: theme.primary,
    fontFamily: "Roboto-Medium",
  },

  white: {
    color: "white",
  },
});

export default (color) => styles(palette[color]);
