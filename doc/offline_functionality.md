[< back to README](https://github.com/truefootprint/field-app#readme)

## Offline functionality

The FieldApp works offline. It must first pull some data from server after the
user has logged in, but after that, users can answer questions, take photos,
create issues, etc. without being connected to the internet.

The way this works is fairly complicated in practice, but it's based on some
simple principles that should be easy to understand. Firstly, the way the app's
views are rendered closely matches the payload received from the `/my_data`
endpoint. This data is fed into the top of the component tree and it trickles
down into all the components. For example, the Project component renders
Activity components and these render Topic components, etc.

Data that the user has entered (e.g. responses) are included in this data. So
somewhere in the payload there are ProjectQuestions and these contain responses
and issues that have generated by the current user. When a user is offline and
enters this data, the app is designed so that "stitches" this data into the
payload _as though_ it's what it would have received from the backend server.
The views have no knowledge what data was generated offline in this way, they
just render the payload as normal.

In short, the app keeps a local copy of its user-generated data and this is
merged into the data it has fetched from the server. The
`./app/helpers/stitch_my_data.js` file handles this process. It has tests that
may be useful to refer to.

### The database

The app contains a SQLite database. At the moment, all of its tables are used
to support this offline functionality. The database is the "holding pen" for
data generated while offline that hasn't yet been sent to the server. When a
user answers a question, a Response record is created in the database. When the
app is online, this response is sent to the server. It is then removed once a
new payload has been pulled from the backend that is now guaranteed to include
the response.

The `Response`, `IssueNote` and `Image` models have a `pushed` field. This is
used to track whether the record has been pushed to the backend yet. It could
be the case that records have been pushed but a new payload has not been pulled
yet. In this case, we need to hold onto these records and continue to "stitch"
them into the existing payload, otherwise the user wouldn't see their own
responses after restarting the app.

### Attachments

The `Attachment` model is not like the others. It does not have a `pushed` field
but instead has a `pulled` field. This model is used to track which files have
been downloaded from the server. This includes images and project contracts that
appear in the Project Summary section of the app.

Attachments are created when data is pulled from the server. The `pullData`
workflow scans the entire payload for references to file attachments. These are
then downloaded asynchronously by the `downloadFile` workflow. Since attachments
can be large binary files, this workflow downloads one file at a time and
randomises the order of downloads in case there's a problem with one of them.
Perhaps it's too large or has an invalid format, etc.

When attachments are used in the app, they are wrapped in the `Downloader`
component which checks if they file has been downloaded or not. Otherwise, the
app would error if tries to present a file on disk that doesn't exist. This also
allows the user to force a download of that specific file if they wish, provided
they are connected to WiFi.

### Online/offline detection

The `useWifi` hook determines whether the user is connected to the internet.
We've been careful not to download anything using cellular data since this can
be expensive for users of the app and we don't want to incur unnecessary costs
for them. We have a backlog item to make this user-controllable so they can
decide whether it's ok for the app to use cellular data or not, but for now the
app only synchronizes over WiFi.

If the app detects a status change from offline to online it will run the
synchronization tasks. This code lives in an `useWhen` hook in `app/index.js`.

### File cache

There is a `FileCache` that prevents the app from pulling data from the backend
when it probably doesn't need to. Of course, projects and questions can be
changed at any time through the
[FieldAdmin](https://github.com/truefootprint/field-admin) system, but the app
only pulls this data once per day. That means these changes won't be reflected
until the next day when the user opens the app again.

If the user changes the language of their device, this behaviour means the app
won't actually change language until the next day because translations are
included in the payload from the backend. This is an edge case, but worth
knowing about in case you're faced with this unexpected problem.

### Submission periods

We want users to be able to answer the same question more than once if they use
the app over several days. They should not have to change the answer they
entered last time. Their answer should be treated as a continuation of the
previous value.

A "submission period" lasts for a 24 hour period. The Question component shows
responses entered within this period, otherwise the input fields are cleared
ready for new answers to questions. This mechanism works irrespective of whether
the user is online or offline.

The FileCache expiry time is based around submission periods and data is batched
in the `pushData` workflow based on this.

[< back to README](https://github.com/truefootprint/field-app#readme)
