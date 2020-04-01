import initializeSentry from "./app/helpers/sentry";

// Capture exceptions and send them to Sentry. Do this before loading anything.
initializeSentry();

export { default } from "./app/index";
