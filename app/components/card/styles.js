import { StyleSheet } from "react-native";
import palette from "../layout/palette";

export default (theme) => StyleSheet.create({
  card: {
    flex: 1,
    width: "95%",
    borderColor: palette.black.primary,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
    overflow: "hidden",
  },

  colored_bar: {
    height: 6,
    backgroundColor: palette[theme].primary,
  }
});
