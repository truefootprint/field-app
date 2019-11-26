import { render, fireEvent } from "react-native-testing-library";
import expect from "expect";
import innerText from "./helpers/inner_text";
import toHaveText from "./helpers/have_text";
import props from "./helpers/props";
import palette from "../app/components/layout/palette";

global.render = render;
global.fireEvent = fireEvent;
global.innerText = innerText;
global.props = props;
global.palette = palette;

expect.extend({ toHaveText });
