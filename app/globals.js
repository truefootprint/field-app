import React, { useState, useEffect, cloneElement } from "react";
import { View, StyleSheet, Button, TouchableOpacity, TouchableWithoutFeedback, Text, Modal, ScrollView } from "react-native";
import Svg, { Path } from "react-native-svg";
import className from "./helpers/class_name";
import palette from "./helpers/palette";

global.React = React;
global.useState = useState;
global.useEffect = useEffect;
global.cloneElement = cloneElement;

global.View = View;
global.StyleSheet = StyleSheet;
global.Button = Button;
global.TouchableOpacity = TouchableOpacity;
global.Touchable = TouchableWithoutFeedback;
global.Text = Text;
global.Modal = Modal;
global.ScrollView = ScrollView;
global.Svg = Svg;
global.Path = Path;

global.className = className;
global.palette = palette;
global.verythin = StyleSheet.hairlineWidth;
global.thin = verythin * 2.5;
