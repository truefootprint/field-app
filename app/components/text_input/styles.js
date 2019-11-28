const styles = (theme) => StyleSheet.create({
  native_input: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    textAlignVertical: "bottom",
    paddingBottom: 8,
    lineHeight: 24,
    fontStyle: "normal",
    fontSize: 16,
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
  }
});

export default (color) => styles(palette[color]);
