import "../app/globals";
import { render, fireEvent } from "react-native-testing-library";
import expect from "expect";
import innerText from "./support/inner_text";
import toHaveText from "./support/have_text";
import props from "./support/props";
import style from "./support/style";

global.render = render;
global.fireEvent = fireEvent;
global.innerText = innerText;
global.props = props;
global.style = style;

expect.extend({ toHaveText });
