import * as Font from "expo-font";
import Response from "../models/response";
import Image from "../models/image";

const loadApp = (callback=()=>{}, options={}) => {
  const models = loadModels(() => {}, options);
  const fonts = loadFonts();

  Promise.all([models, fonts]).then(() => callback(true));
};

const loadFonts = async (callback=()=>{}) => {
  await Font.loadAsync({
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Medium-Italic": require("../assets/fonts/Roboto-Medium-Italic.ttf"),
  });

  callback();
};

const loadModels = async (callback=()=>{}, options={}) => {
  const m = sequelize.models;

  Response.onLoad(m);
  Image.onLoad(m);

  await sequelize.sync(options);

  callback();
};

export default loadApp;
export { loadFonts, loadModels };
