import React, { useState, useEffect, cloneElement } from "react";
import { View, StyleSheet, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Text, Modal, ScrollView } from "react-native";
import Svg, { Path } from "react-native-svg";
import camelCaseKeys from "camelcase-keys";
import camelCase from "camelcase";
import snakeCaseKeys from "snakecase-keys";
import snakeCase from "to-snake-case";

import { Sequelize, sequelize } from "./helpers/sequelize";
import className from "./helpers/class_name";
import filterIndex from "./helpers/filter_index";
import chunk from "./helpers/chunk";
import palette from "./helpers/palette";

global.React = React;
global.useState = useState;
global.useEffect = useEffect;
global.cloneElement = cloneElement;

global.View = View;
global.StyleSheet = StyleSheet;
global.Touchable = TouchableWithoutFeedback;
global.TouchableOpacity = TouchableOpacity;
global.TouchableHighlight = TouchableHighlight;
global.Text = Text;
global.Modal = Modal;
global.ScrollView = ScrollView;
global.Svg = Svg;
global.Path = Path;
global.camelCaseKeys = camelCaseKeys;
global.camelCase = camelCase;
global.snakeCaseKeys = snakeCaseKeys;
global.snakeCase = snakeCase;

global.Sequelize = Sequelize;
global.sequelize = sequelize;
global.className = className;
global.filterIndex = filterIndex;
global.chunk = chunk;
global.palette = palette;
global.verythin = StyleSheet.hairlineWidth;
global.thin = verythin * 2.5;
