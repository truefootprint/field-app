import initializeSentry from "./app/helpers/sentry";
import catchGlobalErrors from "./app/helpers/global_errors";

// Capture exceptions and send them to Sentry. Do this before loading anything.
initializeSentry();

// Catch exceptions and show an error screen instead of crashing the app.
catchGlobalErrors();

export { default } from "./app/index";
