const styles = (theme) => StyleSheet.create({
  button_like: {
    height: 40,
    borderColor: theme.primary,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: 5,
    backgroundColor: "white",
    elevation: 3,
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },

  fill: {
    backgroundColor: theme.primary,
  },

  center: {
    alignItems: "center",
  }
});

export default (color) => styles(palette[color]);
