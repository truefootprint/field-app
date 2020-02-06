class Logger {
  static max_lines = 200;

  static lines = [];
  static onLine = () => {};

  static log(message) {
    Logger.push("log", message);
    console.log(message);
    Logger.onLine();
  }

  static info(message) {
    Logger.push("info", message);
    console.log(message);
    Logger.onLine();
  }

  static warn(message) {
    Logger.push("warn", message);
    console.warn(message);
    Logger.onLine();
  }

  // private

  static push(type, message) {
    if (typeof message !== "string") {
      message = JSON.stringify(message);
    }

    this.lines.push({ type, message });
    this.lines.slice(-this.max_lines);
  }
}

export default Logger;
