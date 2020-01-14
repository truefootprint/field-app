import BackgroundTask from "./background_task";
import uploadPhoto from "../workflows/upload_photo";
import hasWifi from "../helpers/has_wifi";

// BackgroundFetch tasks are limited to 30 seconds or they're terminated.
// Stop uploading once there's less than 2x the slowest upload time remaining.
const safetyNet = 2;

class PhotoUploadTask extends BackgroundTask {
  static name() {
    return "PhotoUploadTask";
  }

  static async run() {
    const connected = await hasWifi();
    return await this.runWith({ connected, timeLimit: 30 });
  }

  static async runWith({ connected, timeLimit } = {}) {
    if (!connected) return false;

    let elapsedTime = 0;
    let slowestTime = 0;
    let uploadCount = 0;

    while (!timeLimit || elapsedTime + slowestTime * safetyNet < timeLimit) {
      const timeBefore = new Date().getTime();
      const photoWasUploaded = await catchError(uploadPhoto);

      if (!photoWasUploaded) break; // There's nothing left to upload.

      const timeAfter = new Date().getTime();
      const elapsed = (timeAfter - timeBefore) / 1000;

      elapsedTime += elapsed;
      slowestTime = Math.max(slowestTime, elapsed);
      uploadCount += 1;
    }

    return uploadCount > 0;
  }
};

const catchError = async (callback) => {
  try {
    return await callback();
  } catch {
    return false;
  }
};

export default PhotoUploadTask;
