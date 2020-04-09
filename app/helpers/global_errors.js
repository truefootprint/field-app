import * as tracking from "promise/setimmediate/rejection-tracking";
import { Alert } from "react-native";

// If an Expo app crashes, the default behaviour is to reload the app. We don't
// want this, e.g. if a server request fails, the user should still be able to
// use the app and the request will retry (and hopefully succeed) later.
//
// Instead of reloading the app, we instead show an alert to the user. This can
// be tested in production by tapping on the Version component a few times. The
// handleError function calls 'previous' so errors are still sent to Sentry.
//
// If an unhandled Promise is rejected, the sentry-expo package is smart and
// captures that, but there's no way to hook into this process. Therefore, we
// capture these ourself, log them and call handleError to send them to Sentry.

ErrorUtils.setGlobalHandler(() => {}); // Clear Expo's handler at import time.

const catchGlobalErrors = () => {
  const previous = ErrorUtils.getGlobalHandler();

  const handleError = (error, isFatal) => {
    Alert.alert(...friendlyMessage(error.message || ""));

    if (previous && previous.name !== "handleError") {
      previous(error, isFatal);
    }
  };

  const handleRejected = (displayId, error) => {
    Logger.warn(error.message);
    handleError(error);
  };

  const friendlyMessage = (message) => {
    let title, body;

    if (message.match(/\d\d\d status/)) {
      [title, body] = [t("error.network.title"), t("error.network.body")];
    } else {
      [title, body] = [t("error.unknown.title"), t("error.unknown.body")];
    }

    if (message.length > 0) {
      body += `\n\n${t("error.details")}\n${message.trim()}`;
    }

    return [title, body];
  };

  // The useTranslate hook should define global.translate. If the app errors
  // before we even get there, fallback to the pre-login English translations.
  const t = (key) => (
    global.translate ? global.translate(key) : preLoginTranslations["en"][key]
  );

  ErrorUtils.setGlobalHandler(handleError);
  tracking.enable({ allRejections: true, onUnhandled: handleRejected });
};

export default catchGlobalErrors;
