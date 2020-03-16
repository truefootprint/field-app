import * as Sentry from "sentry-expo";
import { dsn } from "../../config/sentry.json";
import Constants from "expo-constants";

const initializeSentry = () => {
  Sentry.init({ dsn, enableInExpoDevelopment: false, debug: true });
  Sentry.setRelease(Constants.manifest.revisionId);
};

export default initializeSentry;
