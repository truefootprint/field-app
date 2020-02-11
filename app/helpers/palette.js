const palette = {
  green: {
    primary:       "rgb(108, 187, 154)",
    primaryTint:   "rgb(103, 177, 146)",
    secondary:     "rgb(95, 115, 106)",
    secondaryTint: "rgb(75, 87, 81)",
  },

  yellow: {
    primary:       "rgb(211, 191, 115)",
    primaryTint:   "rgb(198, 180, 110)",
    secondary:     "rgb(159, 155, 105)",
    secondaryTint: "rgb(110, 107, 71)",
  },

  blue: {
    primary:       "rgb(70, 137, 168)",
    primaryTint:   "rgb(63, 129, 160)",
    secondary:     "rgb(77, 104, 117)",
    secondaryTint: "rgb(53, 76, 86)",
  },

  red: {
    primary:       "rgb(187, 107, 115)",
    primaryTint:   "rgb(171, 104, 111)",
    secondary:     "rgb(133, 91, 101)",
    secondaryTint: "rgb(108, 69, 79)",
  },

  purple: {
    primary:       "rgb(112, 99, 142)",
    primaryTint:   "rgb(103, 91, 129)",
    secondary:     "rgb(78, 64, 83)",
    secondaryTint: "rgb(56, 42, 61)",
  },

  black: {
    primary:       "rgb(51, 51, 51)",
    primaryTint:   "rgb(17, 17, 17)",
  },

  white: {
    primary:       "rgb(238, 238, 237)",
    primaryTint:   "rgb(229, 229, 224)",
    primaryTint2:  "rgb(213, 213, 206)",
  },

  grey: {
    primary:       "rgb(180, 180, 180)",
    primaryTint:   "rgb(100, 100, 100)",
  }
};

palette.names = Object.keys(palette);
palette.colors = palette.names.filter(n => n !== "black" && n !== "white");
palette.cycle = (i) => palette.colors[i % palette.colors.length];

export default palette;
