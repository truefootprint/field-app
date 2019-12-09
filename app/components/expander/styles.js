const styles = (theme) => StyleSheet.create({
  header: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",

    borderTopColor: theme.primary,
    borderTopWidth: 5,

    borderBottomWidth: thin,
    borderBottomColor: palette.white.primaryTint,

    marginBottom: 20,
  },

  inner: {
    width: "95%",
    paddingLeft: "4%",
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  text: {
    fontSize: 16,
  },

  icon: {
    padding: 3,
    backgroundColor: theme.primary,
    borderRadius: 99,
  },

  sticky_icon: {
    transform: [{ rotate: "90deg" }],
  },

  sticky_header: {
    elevation: 1,
  },

  content: {
    width: "100%",
    alignItems: "center",
    display: "none",
  },

  visible: {
    display: "flex",
  },
});

export default (color) => styles(palette[color]);
