const styles = (theme) => StyleSheet.create({
  modal: {
    backgroundColor: theme.secondaryTint,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  inner: {
    backgroundColor: "white",
    width: "92%",
    marginTop: 20,
    marginBottom: 30,
    padding: 15,
    flex: 1,
  },

  top: {
    flexDirection: "row",
  },

  heading: {
    flex: 1,
    fontSize: 28,
    fontFamily: "Roboto-Medium",
    color: palette.black.primary,
    letterSpacing: 0.5,
    marginTop: 2,
    marginBottom: 50,
  },
});

export default (color) => styles(palette[color]);
