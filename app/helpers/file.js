import * as FileSystem from "expo-file-system";

class File {
  static documents = FileSystem.documentDirectory;

  static path = (filename) => {
    return this.isAbsolute(filename) ? filename : `${this.documents}${filename}`;
  }

  static isAbsolute = (filename) => {
    return filename.startsWith("file:");
  }

  static hasDocumentsPath = (absolutePath) => {
    return absolutePath.startsWith(this.documents);
  }

  static basename = (filename) => {
    return filename.split("/").slice(-1)[0];
  };

  static extension = (filename) => {
    return filename.split(".").slice(-1)[0];
  }

  static interpolate = (path) => {
    return path.replace("[[[documents]]]", this.documents);
  };

  static read = async (filename) => {
    return await FileSystem.readAsStringAsync(this.path(filename));
  }

  static write = async (filename, content) => {
    await FileSystem.writeAsStringAsync(this.path(filename), content);
  }

  static readObject = async (filename) => {
    return JSON.parse(await this.read(filename));
  }

  static writeObject = async (filename, object) => {
    await this.write(filename, JSON.stringify(object));
  }

  static move = async (from, to) => {
    await FileSystem.moveAsync({ from: this.path(from), to: this.path(to) });
  }

  static remove = async (filename, { force=true } = {}) => {
    await FileSystem.deleteAsync(this.path(filename), { idempotent: force });
  }

  static listing = async () => {
    return await FileSystem.readDirectoryAsync(this.documents);
  }

  static info = async (filename, options = {}) => {
    return await FileSystem.getInfoAsync(this.path(filename), options);
  }

  static exists = async (filename) => {
    return (await this.info(filename)).exists;
  }

  static modified = async (filename) => {
    return (await this.info(filename)).modificationTime;
  }

  static fingerprint = async (filename) => {
    return (await this.info(filename, { md5: true })).md5;
  }
}

export default File;
