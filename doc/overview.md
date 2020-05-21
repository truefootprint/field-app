[< back to README](https://github.com/truefootprint/field-app#readme)

## Overview

The FieldApp's primary function is data collection. We ask users questions and
receive their responses. Users can upload photos, open issues and collaborate
with other users to solve them.

There are two main sources of complexity in the app:

1. The domain model is rich and flexible. Everything in the app is data-driven
meaning you can set up very different questionnaires depending on need. The
domain model is explained in more detail [here](https://github.com/truefootprint/field-backend/blob/master/doc/domain_model.md).
2. The app is fully functional offline. Users can continue to answer questions,
add photos and collaborate with users. This is then synchronized when back online.
This is explained in more detail [here](./offline_functionality.md).

The remainder of this document contains an overview of how the code is laid out
in this repository.

### app/components

This directory contains all the React components used within the app. These are
[functional components](https://reactjs.org/docs/components-and-props.html) that
are slightly more modern than the class-based alternatives. Each subdirectory
contains an `index.js` and some contain a `styles.js` file that contains
stylesheets that are applied to components through the `className` helper.

Many of the components are designed to be modular and reusable. For example, the
ButtonLike component is used by the Checkbox component, which in-turn is used
by the Radio component. Quite a lot of the components have unit tests that use
Jest and often rely on the `className` helper again which sets the testID
property which can be asserted against.

### app/helpers

This directory contains a mixture of classes and functions used throughout the
app. Some of these are general-purpose helpers, like `group_by` that imitate the
equivalent function in Ruby. Others provide abstractions like the `File` and
`Download` helper and some contain data-processing operations like `stichMyData`
that has been extracted from elsewhere in the app and individually unit tested.

The majority of helpers are made global for convenience in the `app/globals.js`
file along with many other things, including React and things like `useState`
which are commonly needed throughout the app.

### app/hooks

This directory contains application-specific React hooks that are used in a few
places in the app. For example, the `useTranslate` hook provides convenience
access to the downloaded translations and an interface similar to `I18n.t` in a
Rails application. There are hooks for detecting when the app is foregrounded
and when the hardware back button is pressed, amongst other things.

### app/models

The application uses a SQLite database internally to store some of the
application's state. This persists across reloads of the app and includes the
user's responses that have not been pushed to the backend server yet. These
models use the [Sequelize library](https://sequelize.org/) which is a bit like
ActiveRecord.

So far, the database is only really used to hold data until it has been
synchronized, at which point that data is made available instead through the
payload received from the `/my_data` endpoint which is stored instead in a JSON
file in the app's documents directory. Once this data has been pushed, those
records are deleted from the database to avoid potential consistency problems.

Note: The app uses [a fork of Sequelize](https://github.com/punisher97/rn-sequelize)
that has been modified to work with React Native. The test suite doesn't work
with this fork so we use the regular one there. This generally works fine but
there is a small bug in the fork which is guarded against in
`app/helpers/timestamp_field.js`.

### app/presenters

This directory contains a presenter for each model. When data is pushed to the
API, its representation might be slightly different form the app's. For example,
the Sequelize database has its own ID for each record which won't be the same as
the one stored in the backend database. Therefore, we make a few adjustments to
the record's attributes before pushing to the backend (e.g. renaming 'id' to 'localId').

### app/screens

This directory is synonymous to the app/views directory in a Rails app. It
contains the top-level 'screens' that the user interacts with. These screens
contain many React components and are routed using react-navigation. Here's a
quick explanation of each screen.

- **app/screens/login.js**: The login screen where the user enters their phone number.
- **app/screens/home.js**: The first screen the user sees once they've logged in.
  It contains a list of their projects.
- **app/screens/intro.js**: The introductory text we show once the user has
  selected a project. This usually contains onboarding information.
- **app/screens/project.js**: An individual project screen. This contains a project
  summary at the top and the full questionnaire with cards for each question.
- **app/screens/source.js**: The screen shown when the user presses on 'Project
  contract'.  It is called 'source' after 'SourceMaterial' in the domain model
- **app/screens/issue.js**: The chat dialogue screen shown when users record issues.
  This is modelled after a WhatsApp conversation and displays 'issue notes'.

### app/tasks

This directory contains background tasks that run when the app is backgrounded.
The `BackgroundTask` class is a base class that others inherit from. These
background tasks try to synchronize data with the server every 15 minutes when
the user has a WiFi connection. There is more information [here](./background_tasks.md)
and in the [Expo documentation](https://docs.expo.io/versions/latest/sdk/background-fetch/).

### app/workflows

This directory contains important workflows that are the core functionality of
the app, such as answering a question or pulling data from the server. In many
cases, these workflows use other classes/functions to get their job done, such
as `./app/helpers/client.js` but the high-level business logic lives in the
workflow file. These workflows are fairly extensively tested for correctness.

### spec/

The spec directory contains lot of Jest tests for the app. These mirror the
directory structure of the app/ directory in the same way as a Rails app. Most
of the tests are quite low level. They test units of code, often mocking
dependencies. This isn't ideal and we'd to write automated tests at a higher
level that check larger chunks of behaviour, such as the user opening the app
for the first time, logging in, then answering some questions.

We have _some_ infrastructure in place for this. One of the processes that is
run with the app is `./bin/test_server` which runs Appium. This can be used to
control and interact with the mobile device. There is an example feature test in
`spec/features/` that demonstrates how you might write one of these automated
tests. Basically, you select elements by their 'accessibilityLabel' and use the
driver to perform actions, like tapping on buttons.

This is partly why the `className` helper exists so we can identify components
by their `accessibilityLabel` which Appium supports through the `@content-desc`
xpath selector. [Appium desktop](https://github.com/appium/appium-desktop) is
another useful tool that can be used to help with the creation of these tests.


[< back to README](https://github.com/truefootprint/field-app#readme)
