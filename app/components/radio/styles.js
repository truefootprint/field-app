const styles = (theme) => StyleSheet.create({
  circle: {
    width: 20,
    height: 20,
    backgroundColor: "white",
    borderColor: theme.primary,
    borderWidth: thin,
    borderRadius: 10,
  },

  filled: {
    backgroundColor: palette.black.primary,
    borderColor: "white",
    borderWidth: 4,
  },
});

export default (color) => styles(palette[color]);
