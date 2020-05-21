[< back to README](https://github.com/truefootprint/field-app#readme)

## Deploying the app

The app is hosted on the
[Google Play Store](https://play.google.com/store/apps/details?id=com.truefootprint.field_app).
The majority of Android devices support the Google Play Store but not all.
Therefore, it is also possible to download the app directly from
[this link](http://field-app.truefootprint.com/direct).

The deploy the app run the `./bin/deploy` script. This handles all the steps,
including pulling translations, compiling the app and creating a GitHub release
and pushing to Google Play. It also creates a sourcemap that is pushed to Sentry
which improves the error output for captured production errors.

To deploy the app you need three sets of credentials. Ask Edwin or Chris for
the "expo credentials" and "sentry credentials" if you don't have these. You'll
need to generate your own GitHub API token as this is based on a user account
rather than an organisation. Follow
[this guide](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line). You should only need to grant the 'repo' permissions.

There is an explanation of which Android verisons we target [here](https://docs.google.com/document/d/13VCinJgnxbpq3PJFGcGUmi5H3GYmJwIsPyHH9x7jevU/edit).

### Over the air updates

Expo supports "over the air updates" which is explained [here](https://docs.expo.io/guides/configuring-ota-updates/).
In short, the app tries to download a newer bundle of the JavaScript files
without the user having to install a new version of the app manually. This is
the reason the GitHub credentials are needed since we attach these bundle files
to a GitHub release of the project so they may be downloaded by the app.

### GitHub pages

We also push a few files to GitHub pages. This includes a
[privacy policy](https://field-app.truefootprint.com/privacy-policy) and some
redirect links that go to the app on the Google Play Store and some redirects
to GitHub for the direct download link and to view recent releases and recent
changes. These redirects are for convenience and are located in `app/assets/html`.

### Google Play Admin

You should be able to log in as an admin of the FieldApp through the Google Play
Store. You will need to ask Edwin or Chris to grant you access. There you can
configure release management, change the store listing, release alpha/beta
versions of the app, etc. By default, all deployments go straight to production
but it doesn't have to be that way in the future, for example, if a continuous
integration pipeline is introduced.


[< back to README](https://github.com/truefootprint/field-app#readme)
