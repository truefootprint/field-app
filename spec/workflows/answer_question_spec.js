import answerQuestion from "../../app/workflows/answer_question";
import { moveImagesToDocumentStorage } from "../../app/workflows/answer_question";
import pushData from "../../app/workflows/push_data";
import Response from "../../app/models/response";
import SubmissionPeriod from "../../app/helpers/submission_period";
import File from "../../app/helpers/file";

jest.mock("../../app/workflows/push_data");
jest.mock("../../app/helpers/file");

describe("answerQuestion", () => {
  it("creates a response", async () => {
    await answerQuestion({ question: { id: 123 }, answer: "answer" });
    const responses = await Response.findAll();

    expect(responses.length).toBe(1);

    expect(responses[0].questionId).toBe(123);
    expect(responses[0].value).toBe("answer");
  });

  it("updates the response if it already exists", async () => {
    await Response.create({ questionId: 123, value: "answer" });

    await answerQuestion({ question: { id: 123 }, answer: "updated answer" });
    const responses = await Response.findAll();

    expect(responses.length).toBe(1);

    expect(responses[0].questionId).toBe(123);
    expect(responses[0].value).toBe("updated answer");
  });

  it("does not update responses from previous submission periods", async () => {
    const yesterday = SubmissionPeriod.startedAt() - 1000;
    await Response.create({
      questionId: 123,
      value: "yesterday's answer",
      createdAt: yesterday,
    });

    await answerQuestion({ question: { id: 123 }, answer: "today's answer" });
    const responses = await Response.findAll();

    expect(responses.length).toBe(2);

    expect(responses[0].value).toBe("yesterday's answer");
    expect(responses[1].value).toBe("today's answer");
  });

  it("resets pushed so that existing responses will be pushed again", async () => {
    await Response.create({ questionId: 123, value: "answer", pushed: true });

    await answerQuestion({ question: { id: 123 }, answer: "updated answer" });
    const response = await Response.findOne();

    expect(response.pushed).toBe(false);
  });

  it("calls the pushData workflow if there is a connection", async () => {
    await answerQuestion({ question: { id: 123 }, answer: "answer", connected: false });
    expect(pushData).not.toHaveBeenCalled();

    await answerQuestion({ question: { id: 123 }, answer: "answer", connected: true });
    expect(pushData).toHaveBeenCalled();
  });

  it("returns the response", async () => {
    const response = await answerQuestion({
      question: { id: 123 },
      answer: "answer"
    });

    expect(response.questionId).toBe(123);
  });

  it("calls the callback with the response", async () => {
    const callback = jest.fn();
    const response = await answerQuestion({
      question: { id: 123 },
      answer: "answer",
      callback
    });

    expect(callback).lastCalledWith(response);
  });
});

describe("moveImagesToDocumentStorage", () => {
  it("moves the image and names it after its fingerprint", async () => {
    File.fingerprint.mockResolvedValue("md5-fingerprint");
    File.extension.mockReturnValue("jpg");

    const images = [{ uri: "image.jpg" }];
    await moveImagesToDocumentStorage(images);

    expect(File.extension).lastCalledWith("image.jpg");
    expect(File.move).lastCalledWith("image.jpg", "md5-fingerprint.jpg");
  });

  it("does not move the image if it's already in documents", async () => {
    File.hasDocumentsPath.mockReturnValue(true);

    await moveImagesToDocumentStorage([{ uri: "image.jpg" }]);

    expect(File.hasDocumentsPath).lastCalledWith("image.jpg");
    expect(File.move).not.toHaveBeenCalled();
  });

  it("updates the uri to point to the moved file", async () => {
    File.fingerprint.mockResolvedValue("md5-fingerprint");
    File.extension.mockReturnValue("jpg");
    File.path.mockReturnValue("documents/md5-fingerprint.jpg");

    const images = [{ uri: "image.jpg" }];
    await moveImagesToDocumentStorage(images);

    expect(File.path).lastCalledWith("md5-fingerprint.jpg");
    expect(images[0].uri).toBe("documents/md5-fingerprint.jpg");
  });

  it("removes the file if it's a duplicate of a moved image", async () => {
    File.fingerprint.mockResolvedValue("md5-fingerprint");
    File.extension.mockReturnValue("jpg");
    File.exists.mockResolvedValue(true);

    const images = [{ uri: "image.jpg" }];
    await moveImagesToDocumentStorage(images);

    expect(File.exists).lastCalledWith("md5-fingerprint.jpg");
    expect(File.remove).lastCalledWith("image.jpg");
  });

  it("updates the uri to point to the duplicate image file", async () => {
    File.exists.mockResolvedValue(true);
    File.path.mockReturnValue("documents/md5-fingerprint.jpg");

    const images = [{ uri: "image.jpg" }];
    await moveImagesToDocumentStorage(images);

    expect(images[0].uri).toBe("documents/md5-fingerprint.jpg");
  });

  it("returns an array of moved images", async () => {
    File.path.mockReturnValue("documents/md5-fingerprint.jpg");

    const images = [{ uri: "image.jpg" }];
    const result = await moveImagesToDocumentStorage(images);

    expect(result).toEqual([{ uri: "documents/md5-fingerprint.jpg" }]);
  });
});
