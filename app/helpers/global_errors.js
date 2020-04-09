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
      [title, body] = ["Network error", "Sorry, there seems to be a problem with our computers. Please try again later."];
    } else {
      [title, body] = ["Unexpected Error", "Sorry, there seems to be a problem. If it keeps happening, try reinstalling the app."];
    }

    if (message.length > 0) {
      body += `\n\nError details:\n${message.trim()}`;
    }

    return [title, body];
  };

  ErrorUtils.setGlobalHandler(handleError);
  tracking.enable({ allRejections: true, onUnhandled: handleRejected });
};

export default catchGlobalErrors;
