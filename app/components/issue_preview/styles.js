const styles = (theme) => StyleSheet.create({
  issue_preview: {
    borderLeftColor: theme.primary,
    borderLeftWidth: 3,
    marginLeft: -3,
    paddingLeft: 15,
  },

  side_by_side: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    flex: 1,
    marginLeft: -15,
  },

  open: {

  },

  description: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    color: palette.black.primary,
  },

  photo: {
    marginTop: 20,
    paddingBottom: 10,
  },
});

export default (color) => styles(palette[color]);
