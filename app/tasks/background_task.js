import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";

const Result = BackgroundFetch.Result;

// TODO: Currently, the background task doesn't run if the app has terminated
// or after the phone reboots due to a bug in expo.
//
// Tracking issue: https://github.com/expo/expo/issues/3582

class BackgroundTask {
  static name() {
    throw new Error("Implement me");
  }

  // Make this method return true if new data was fetched.
  static async run() {
    throw new Error("Implement me");
  }

  static enable({ log=false } = {}) {
    const name = this.name();
    const options = { stopOnTerminate: false, startOnBoot: true };
    const interval = 15; // minutes;

    log && console.log(`Defining ${name} background task...`);
    TaskManager.defineTask(name, () => this.runSafely(name, log));

    return BackgroundFetch.registerTaskAsync(name, options).then(() => {
      BackgroundFetch.setMinimumIntervalAsync(interval);
      log && console.log(`Successfully registered ${name} background task`);
    });
  }

  static async runSafely (name, log) {
    log && console.log(`Running ${name} background task...`);

    try {
      const bool = await this.run();
      return bool ? Result.NewData : Result.NoData;

    } catch (error) {
      log && console.error(`Error running ${name} background task:`, error);
      return Result.Failed;
    }
  }
}

export default BackgroundTask;
