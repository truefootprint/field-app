## FieldApp

This repository contains a React Native mobile app that allows users to answer
questions about projects and open issues relating to them. It speaks to the
[FieldBackend](https://github.com/truefootprint/field-backend). The app is
distributed to users via the
[Google Play Store](https://play.google.com/store/apps/details?id=com.truefootprint.field_app)
and is built using the [Expo framework](https://docs.expo.io/) which provides
access to features of the mobile device such as the camera.

### Documentation

In addition to this README which contains setup instructions, the [doc/](doc/)
directory contains these useful resources:

1. [Overview](./doc/overview.md)
2. [Offline functionality](./doc/offline_functionality.md)
3. [Background tasks](./doc/background_tasks.md)
4. [Translations](./doc/translations.md)
5. [Deploying the app](./doc/deploying_the_app.md)

You should also refer to [FieldBackend](https://github.com/truefootprint/field-backend#readme)
which contains documentation about the domain model and much more.

### Setting up the app

1. Set up [FieldBackend](https://github.com/truefootprint/field-backend#readme) first if you haven't already
2. Follow [these instructions](https://docs.expo.io/get-started/installation/) to set up Expo
3. Install Android Studio (`brew cask install android-studio`)
4. Install ngrok which is used for tunnelling (`brew cask install ngrok`)
5. Run `yarn` to install the application's dependencies
6. Follow [these instructions](https://developer.android.com/studio/run/managing-avds) to add a virtual device (e.g. a Google Pixel)
7. Run `./bin/emulator` to start the virtual device
8. Run `./bin/expo_server` to start the code bundling/compilation server
9. Run `./bin/test_server` to start Appium (for the tests in spec/features)
10. Run `./bin/backend` to start the Rails server in the FieldBackend project
11. Run `./bin/tunnel` to start tunneling to your localhost with ngrok
12. Run `./bin/switch_env dev` to update `config/host.json` to point to the tunnel
13. Run `./bin/test` or `./bin/test_watch` to run the test suite

At this point, you can press 'a' in the `./bin/expo_server` terminal window to
launch the app on the Android device.

You may need to terminate the app and relaunch it if it's already open from a
previous session. You may need to touch a file in the project (by saving it) to
force-reload the cache so the app reloads. It can be a bit temperamental and
requires all five processes running at the same time (steps 7 to 11).

Once the app is running, it is usually a good idea to clear the app's storage
from previous sessions by going to 'Show console' > 'Reset app' in the bottom
right of the screen. If you get stuck, refer to the Expo setup instructions and
look at what each `./bin` script does to understand more.

### License

Copyright 2020, [TrueFootprint Limited](https://www.truefootprint.com/), All Rights Reserved
