const styles = (theme) => StyleSheet.create({
  issue: {
    backgroundColor: theme.secondaryTint,
    flex: 1,
    alignItems: "center",
  },

  inner: {
    width: "95%",
  }
});

export default (color) => styles(palette[color]);
