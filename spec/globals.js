import "../app/globals";
import { render, fireEvent } from "react-native-testing-library";
import expect from "expect";

import sequelize from "./support/sequelize";
import benchmark from "./support/benchmark";
import innerText from "./support/inner_text";
import toHaveText from "./support/have_text";
import resetDB from "./support/reset_db";
import props from "./support/props";
import style from "./support/style";
import sleep from "./support/sleep";

global.render = render;
global.fireEvent = fireEvent;
global.sequelize = sequelize;
global.benchmark = benchmark;
global.innerText = innerText;
global.props = props;
global.style = style;
global.sleep = sleep;

expect.extend({ toHaveText });

beforeEach(() => benchmark(resetDB));
beforeEach(jest.resetAllMocks);
