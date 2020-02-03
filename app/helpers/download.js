import * as FileSystem from "expo-file-system";

// This class can be used to download files asynchronously. Downloads can be
// paused and resumed later, including between app restarts. Currently, only
// one download at a time is supported, or an error is thrown.
//
// Functions return promises that resolve to true once the download completes.
// If the download fails, or it was paused, the promise resolves to false. If
// a download repeatedly fails, it can be cleared with Download.reset().
//
// Download.restoreSnapshot() should be called during the app loading process.

class Download {
  static snapshotFile = "paused_download.json";

  static async start(remoteUrl, filename) {
    remoteUrl = replaceLocalhost(remoteUrl);

    const path = File.path(filename);
    const options = { md5: true };
    const resumable = FileSystem.createDownloadResumable(remoteUrl, path, options);

    await this.setHandle(resumable);

    return this.catchError(async () => {
      await resumable.downloadAsync();
      await this.clearHandle();
    });
  }

  static async pause() {
    const resumable = this.getHandle({ orThrow: true });

    return this.catchError(async () => {
      await resumable.pauseAsync();
      await this.writeSnapshot(resumable);
    });
  }

  static async resume() {
    const resumable = this.getHandle({ orThrow: true });

    return this.catchError(async () => {
      await resumable.resumeAsync();
      await this.clearHandle();
    });
  }

  static inProgress() {
    return !!this.getHandle();
  }

  static async reset() {
    await this.clearHandle();
  }

  static async restoreSnapshot() {
    const s = await this.readSnapshot();
    if (!s) return;

    const resumable = new FileSystem.DownloadResumable(
      s.url, s.fileUri, s.options, ()=>{}, s.resumeData,
    );

    await this.setHandle(resumable);
  }

  // private

  static getHandle ({ orThrow } = {}) {
    if (orThrow && !this.handle) {
      throw new Error("There is no download in progress.");
    }

    return this.handle;
  }

  static async setHandle(resumable) {
    if (this.handle) {
      throw new Error("There is already a download in progress.");
    }

    this.handle = resumable;
  }

  static async clearHandle() {
    await File.remove(this.snapshotFile, { force: true });

    this.handle = null;
  }

  static async readSnapshot() {
    const exists = await File.exists(this.snapshotFile);
    if (!exists) return;

    const snapshot = await File.readObject(this.snapshotFile);
    return snapshot;
  }

  static async writeSnapshot(resumable) {
    console.log(resumable.savable());
    await File.writeObject(this.snapshotFile, resumable.savable());
  }

  static async catchError(callback) {
    try {
      await callback();
      return true;
    } catch {
      return false;
    }
  }
}

export default Download;
