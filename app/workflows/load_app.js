import * as Font from "expo-font";
import Response from "../models/response";
import IssueNote from "../models/issue_note";
import Image from "../models/image";
import Attachment from "../models/attachment";

const loadApp = async (callback=()=>{}, options={}) => {
  const models = loadModels(() => {}, options);
  const fonts = loadFonts();
  const download = loadDownloadSnapshot();

  await Promise.all([models, fonts, download]);

  callback();
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
  IssueNote.onLoad(m);
  Image.onLoad(m);
  Attachment.onLoad(m);

  await sequelize.sync(options);

  callback();
};

const loadDownloadSnapshot = async (callback=()=>{}, options={}) => {
  await Download.restoreSnapshot();

  callback();
}

export default loadApp;
export { loadFonts, loadModels };
