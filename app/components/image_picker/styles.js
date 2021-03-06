const styles = (theme) => StyleSheet.create({
  text: {
    fontSize: 16,
    letterSpacing: 0.5,
    color: palette.black.primary,
    marginBottom: 15,
  },

  rectangle: {
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

  menu_item: {
    backgroundColor: "white",
    fontSize: 18,
    padding: 20,
  }
});

export default (color) => styles(palette[color]);
