const styles = (theme) => StyleSheet.create({
  native_input: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    textAlignVertical: "bottom",
    paddingBottom: 8,
    lineHeight: 24,
    fontStyle: "normal",
    fontSize: 16,
    flex: 1,
  },

  focussed: {
    borderBottomColor: theme.primary,
    borderBottomWidth: 2,
  },

  selection: {
    color: theme.primary, // Also controls the cursor color.
  },

  placeholder: {
    color: "#aaa",
    fontStyle: "italic",
  },

  alternative: {
    color: "#aaa",
  },

  side_by_side: {
    flexDirection: "row",
  },

  units: {
    textAlignVertical: "bottom",
    paddingBottom: 8,
    paddingLeft: 8,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    color: theme.primary,
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.5,
  },
});

export default (color) => styles(palette[color]);
