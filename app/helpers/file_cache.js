import File from "./file";
import SubmissionPeriod from "./submission_period";

class FileCache {
  static async fetch(filename, { type, onMiss, maxAge } = {}) {
    if (filename.endsWith(".json")) type = type || "object";

    const readMethod = type === "object" ? File.readObject : File.read;
    const writeMethod = type === "object" ? File.writeObject : File.write;

    const exists = await File.exists(filename);
    const expired = exists && await this.expired(filename, maxAge);

    if (exists && !expired) {
      return await readMethod(filename);
    }

    if (onMiss) {
      let content;
      try { content = await onMiss(); } catch {};

      if (content) {
        writeMethod(filename, content);
        return content;
      }

      if (exists) {
        return await readMethod(filename);
      }
    }
  }

  static async expired(filename, maxAge) {
    if (typeof maxAge === "undefined") {
      maxAge = SubmissionPeriod.secondsSinceStart();
    }

    const modifiedTime = await File.modified(filename);
    const currentTime = new Date().getTime() / 1000;

    return modifiedTime + maxAge < currentTime;
  }
}

export default FileCache;
