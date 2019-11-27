import React from "react";
import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import className from "./helpers/class_name";
import palette from "./helpers/palette";

global.React = React;
global.View = View;
global.StyleSheet = StyleSheet;
global.Button = Button;
global.TouchableOpacity = TouchableOpacity;
global.Text = Text;

global.className = className;
global.palette = palette;