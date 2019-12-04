import React, { useState, useEffect, cloneElement } from "react";
import { View, StyleSheet, Button, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Text, Modal, ScrollView } from "react-native";
import Svg, { Path } from "react-native-svg";
import className from "./helpers/class_name";
import filterIndex from "./helpers/filter_index";
import palette from "./helpers/palette";

global.React = React;
global.useState = useState;
global.useEffect = useEffect;
global.cloneElement = cloneElement;

global.View = View;
global.StyleSheet = StyleSheet;
global.Button = Button;
global.Touchable = TouchableWithoutFeedback;
global.TouchableOpacity = TouchableOpacity;
global.TouchableHighlight = TouchableHighlight;
global.Text = Text;
global.Modal = Modal;
global.ScrollView = ScrollView;
global.Svg = Svg;
global.Path = Path;

global.className = className;
global.filterIndex = filterIndex;
global.palette = palette;
global.verythin = StyleSheet.hairlineWidth;
global.thin = verythin * 2.5;
