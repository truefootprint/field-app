[< back to README](https://github.com/truefootprint/field-app#readme)

## Background Tasks

When the app is backgrounded, the Android operating system is still able to run
code from the app via background tasks. We use background tasks to try to
synchronize data with the server. For example, if the user answered some
questions when the app was offline, we might only successfully send these
responses to the server an hour later when they have a WiFi connection.

All of the background tasks inherit from the `BackgroundTask` class. This
registers the task with the operating system and uses the
[BackgroundFetch API](https://docs.expo.io/versions/latest/sdk/background-fetch/).
At time of writing, there is a bug which means background tasks do not run after
the app has been terminated by the user and after the phone has rebooted.
Ideally, we'd like to run background tasks at all times to maximise the app's
opportunity to speak to the server so we should closely monitor the bug and
update the relevant libraries when this bug has been fixed. There are more
details in some comments the BackgroundTask class.

When background tasks run, the first thing they do is check if the app is
connected to the internet (via WiFi), otherwise they return and do nothing.
Since background tasks run in a separate process to the main app, they must also
set global state such as the API token before communicating with the backend.

The BackgroundFetch API expects background tasks to return a `Result` that
indicates whether data was _actually_ fetched or not. The `BackgroundTask` class
expects subclasses to return either true or false to indicate this. If they do
not return correctly, the operating system scheduler may decide not to run the
task if, for example, it appears it fails every time it is run.

The operating system scheduler may decide not to run these tasks at all if the
device is low on power or connectivity. Additionally, tasks that take longer
than 30 seconds are killed and marked as failed so we need to be very careful
not to exceed this time limit, otherwise we might not receive valuable user data
from the app.

The `FileDownloadTask` is perhaps the most complicated because of this. It tries
to download as many files as possible without exceeding the time limit based on
how long it estimates each download will take based on previous ones. These
constraints definitely add unwanted complexity to the app.

[< back to README](https://github.com/truefootprint/field-app#readme)
