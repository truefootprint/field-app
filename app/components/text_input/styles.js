const styles = (theme) => StyleSheet.create({
  native_input: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingTop: 1,
    paddingLeft: 5,
    paddingBottom: 5,
    lineHeight:1,
    fontStyle: "normal",
    fontSize: 16,
    flex: 1,
  },

  focussed: {
    borderBottomColor: theme.primary,
    borderBottomWidth: 2,
  },

  focused_question_styles: {
    borderTopColor: theme.primary, 
    borderLeftColor: theme.primary, 
    borderRightColor: theme.primary, 
    borderTopWidth: 2, 
    borderLeftWidth: 2, 
    borderRightWidth: 2
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
