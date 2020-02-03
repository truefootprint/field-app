import BackgroundTask from "./background_task";
import { downloadRandomFile } from "../workflows/download_file";
import hasWifi from "../helpers/has_wifi";

// BackgroundFetch tasks are limited to 30 seconds or they're terminated.
// Stop downloading and save a snapshot once there's 5 seconds remaining.
const safetyNet = 5;

// Stop downloading if downloadRandomFile fails 3 times. Most of the time this
// will happen because there's nothing left to download.
const maxFailed = 3;

class FileDownloadTask extends BackgroundTask {
  static name() {
    return "FileDownloadTask"
  }

  static async run() {
    const connected = await hasWifi();

    // Files are public so we don't need the API token.

    return await this.runWith({ connected, timeLimit: 30 });
  }

  static async runWith({ connected, timeLimit } = {}) {
    if (!connected) return false;

    const startTime = new Date().getTime();

    let outOfTime = false;
    let downloading = false;
    let successCount = 0;
    let failedCount = 0;

    // Check if we're out of time whenever bytes are downloaded. For large files
    // we can pause the download and resume it the next time the task runs.
    Download.onBytes = () => {
      const currentTime = new Date().getTime();
      const elapsed = (currentTime - startTime) / 1000;

      if (timeLimit && elapsed + safetyNet >= timeLimit) {
        outOfTime = true;
        Download.onBytes = () => {};
      }
    };

    // Download files one after another until we're out of time or maxFailed is
    // reached. This will happen if there are no files left to download.
    while (!outOfTime && failedCount < maxFailed) {
      if (!downloading) {
        downloading = true;

        this.nextDownload(success => {
          success ? successCount += 1 : failedCount += 1;
          downloading = false;
        });
      }

      // Do something asynchronous to give control back to the main thread.
      // Unfortunately, setTimeout doesn't seem to work in background tasks.
      await File.listing();
    }

    // Use the safetyNet time to save a snapshot of the partial file donwload.
    if (Download.inProgress()) {
      await Download.pause();
    }

    return successCount > 0;
  }

  static nextDownload(onFinish) {
    if (Download.inProgress()) {
      Download.resume().then(onFinish);
    } else {
      downloadRandomFile().then(onFinish);
    }
  }
}

export default FileDownloadTask;
