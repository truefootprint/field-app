const styles = (theme) => StyleSheet.create({
  button_like: {
    height: 40,
    borderColor: theme.primary,
    borderWidth: thin,
    backgroundColor: "white",
    elevation: 3,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  rounded: {
    borderRadius: 5,
  },

  fill: {
    backgroundColor: theme.primary,
  },

  center: {
    justifyContent: "center",
  }
});

export default (color) => styles(palette[color]);
