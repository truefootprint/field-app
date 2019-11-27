import React, { useState } from "react";
import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import className from "./helpers/class_name";
import palette from "./helpers/palette";

global.React = React;
global.useState = useState;

global.View = View;
global.StyleSheet = StyleSheet;
global.Button = Button;
global.TouchableOpacity = TouchableOpacity;
global.Text = Text;

global.className = className;
global.palette = palette;
global.verythin = StyleSheet.hairlineWidth;
global.thin = verythin * 2.5;
