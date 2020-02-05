import FileDownloadTask from "../../app/tasks/file_download_task";
import { downloadRandomFile } from "../../app/workflows/download_file";
import Download from "../../app/helpers/download";
import hasWifi from "../../app/helpers/has_wifi";

jest.mock("../../app/workflows/download_file");
jest.mock("../../app/helpers/download");
jest.mock("../../app/helpers/has_wifi");

describe("FileDownloadTask", () => {
  beforeEach(() => {
    hasWifi.mockResolvedValue(true);

    // Make it seem like the downloads failed, otherwise the task runs forever.
    downloadRandomFile.mockImplementation(() => Promise.resolve(false));
    Download.resume.mockImplementation(() => Promise.resolve(false));
  });

  // If one of the file downloads fails repeatedly for whatever reason, making
  // the order random means we'll hopefully still download some of the files.
  it("downloads files in a random order", async () => {
    await FileDownloadTask.run();

    expect(downloadRandomFile).toHaveBeenCalled();
  });

  it("does not download files if there's no connection", async () => {
    hasWifi.mockResolvedValue(false);
    await FileDownloadTask.run();

    expect(downloadRandomFile).not.toHaveBeenCalled();
  });

  it("returns false if there's no connection", async () => {
    hasWifi.mockResolvedValue(false);
    expect(await FileDownloadTask.run()).toBe(false);
  });

  it("returns whether files were downloaded", async () => {
    downloadRandomFile.mockImplementationOnce(() => Promise.resolve(true));

    expect(await FileDownloadTask.run()).toBe(true);
    expect(await FileDownloadTask.run()).toBe(false);
  });

  it("resumes the download if there's one in progress when the task starts", async () => {
    Download.inProgress.mockReturnValue(false);
    await FileDownloadTask.run();
    expect(Download.resume).not.toHaveBeenCalled();

    Download.inProgress.mockReturnValue(true);
    await FileDownloadTask.run();
    expect(Download.resume).toHaveBeenCalled();
  });

  it("pauses the download if there's one in progress when the task ends", async () => {
    Download.inProgress.mockReturnValue(false);
    await FileDownloadTask.run();
    expect(Download.pause).not.toHaveBeenCalled();

    Download.inProgress.mockReturnValue(true);
    await FileDownloadTask.run();
    expect(Download.pause).toHaveBeenCalled();
  });

  it("ends the task after a maximum of three failed downloads", async () => {
    await FileDownloadTask.run();

    expect(downloadRandomFile.mock.calls.length).toBe(3);
  });
});
