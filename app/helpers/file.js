import * as FileSystem from "expo-file-system";

class File {
  static directory = FileSystem.documentDirectory;

  static path = (filename) => {
    return `${this.directory}${filename}`;
  };

  static read = async (filename) => {
    return await FileSystem.readAsStringAsync(this.path(filename));
  };

  static write = async (filename, content) => {
    await FileSystem.writeAsStringAsync(this.path(filename), content);
  };

  static readObject = async (filename) => {
    return JSON.parse(await this.read(filename));
  }

  static writeObject = async (filename, object) => {
    await this.write(filename, JSON.stringify(object));
  };

  static info = async (filename) => {
    return await FileSystem.getInfoAsync(this.path(filename));
  };

  static exists = async (filename) => {
    return (await this.info(filename)).exists;
  };

  static modified = async (filename) => {
    return (await this.info(filename)).modificationTime;
  }
}

export default File;
