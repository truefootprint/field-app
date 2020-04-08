import * as tracking from "promise/setimmediate/rejection-tracking";
import { Alert } from "react-native";

// This runs after Expo and Sentry have registered their own listeners, although
// Expo has RootErrorBoundary that may still intercept errors in development.
//
// If an unhandled Promise is rejected, the sentry-expo package is smart and
// captures that, but there's no way to hook into this process at present.
//
// Therefore, we capture these rejections ourselves, log them and call then
// handleError function which _should_ send them to Sentry (it calls previous).
//
// Instead of crashing the app, we instead show alerts to the user which can
// be tested in production by tapping on the Version component a few times.

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

import React from "react";
class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError (error) {
    return { hasError: true }
  }

  componentDidCatch (error, info) {
    alert('test');
  }

  render () {
    return this.state.hasError ? null : this.props.children;
  }
}

export default catchGlobalErrors;
export { ErrorBoundary };
