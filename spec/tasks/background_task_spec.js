import BackgroundTask from "../../app/tasks/background_task";

import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";

jest.mock("expo-task-manager");
jest.mock("expo-background-fetch");

class TestBackgroundTask extends BackgroundTask {
  static name() {
    return "task name";
  }

  static async run() {
    this.taskHasRun = true;
  }
}

describe("BackgroundTask", () => {
  beforeEach(() => {
    BackgroundFetch.registerTaskAsync.mockResolvedValue();
    TestBackgroundTask.taskHasRun = false;
  });

  it("defines a TaskManager task", () => {
    TestBackgroundTask.enable();

    expect(TaskManager.defineTask)
      .lastCalledWith("task name", expect.anything());
  });

  it("sets the TaskManager task to the run function of the class", () => {
    TestBackgroundTask.enable();

    const lastCall = TaskManager.defineTask.mock.calls[0];
    const definedTask = lastCall[1];

    expect(TestBackgroundTask.taskHasRun).toBe(false);

    definedTask();
    expect(TestBackgroundTask.taskHasRun).toBe(true);
  });

  it("registers the task with BackgroundFetch", () => {
    TestBackgroundTask.enable();

    expect(BackgroundFetch.registerTaskAsync)
      .lastCalledWith("task name", expect.anything());
  });

  it("runs the task even if the phone reboots or the app terminates", () => {
    TestBackgroundTask.enable();

    const expectedOptions = { startOnBoot: true, stopOnTerminate: false };

    expect(BackgroundFetch.registerTaskAsync)
      .lastCalledWith(expect.anything(), expectedOptions);
  });

  it("runs the task every 15 minutes", async () => {
    await TestBackgroundTask.enable();

    expect(BackgroundFetch.setMinimumIntervalAsync).lastCalledWith(15);
  });

  it("can optionally log to the console", () => {
    jest.spyOn(global.console, "log").mockImplementation();

    TestBackgroundTask.enable({ log: false });
    expect(console.log).not.toHaveBeenCalled();

    TestBackgroundTask.enable({ log: true });
    expect(console.log).toHaveBeenCalled();
  });
});
