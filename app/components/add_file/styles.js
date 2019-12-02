const styles = (theme) => StyleSheet.create({
  add_file: {
    width: "35%",
    aspectRatio: 2 / 3,
    borderColor: theme.primary,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderRadius: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },

  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.primary,
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  plus: {
    color: "white",
    fontSize: 25,
    lineHeight: 30,
  },
});

export default (color) => styles(palette[color]);
