const styles = (theme) => StyleSheet.create({
  card: {
    marginTop: 20,
    marginBottom: 20,
    width: "95%",
  },

  inner: {
    borderTopColor: theme.primary,
    borderTopWidth: 10,
    borderRadius: 7,
    padding: "4%",
    elevation: 2,
  },

  top: {
    flexDirection: "row",
    marginBottom: 15,
  },

  heading: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: theme.primary,
    letterSpacing: 0.5,
  },

  ordinal: {
    marginTop: 6.5,
    paddingLeft: 10,
    letterSpacing: 0.5,
  },
});

export default (color) => styles(palette[color]);
