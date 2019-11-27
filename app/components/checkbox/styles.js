const styles = (theme) => StyleSheet.create({
  box: {
    width: 20,
    height: 20,
    //borderRadius: 10,
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
    marginBottom: 2,
    color: theme.primary,
  },

  white: {
    color: "white",
  },
});

export default (color) => styles(palette[color]);
