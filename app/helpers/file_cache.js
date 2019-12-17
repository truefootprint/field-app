import File from "./file";

class FileCache {
  static async fetch(filename, { type, onMiss, maxAge } = {}) {
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
      maxAge = secondsSinceMidnight();
    }

    const modifiedTime = await File.modified(filename);
    const currentTime = new Date().getTime() / 1000;

    return modifiedTime + maxAge < currentTime;
  }
}

const secondsSinceMidnight = () => {
  const now = new Date().getTime() / 1000;
  const midnight = getMidnight().getTime() / 1000;

  return now - midnight;
};

const getMidnight = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  return date;
};

export default FileCache;
