import Response from "../models/response";
import SubmissionPeriod from "../helpers/submission_period";
import pushData from "./push_data";
import File from "../helpers/file";

const answerQuestion = async ({ connected, question, answer, callback=()=>{} }) => {
  if (question.type === "PhotoUploadQuestion") {
    //const movedImages = await moveImagesToDocumentStorage(answer);
    answer = JSON.stringify(answer);
  }

  const response = await createOrUpdate(Response, {
    where: {
      questionId: question.id,
      createdAt: {
        [Op.gte]: SubmissionPeriod.startedAt(),
      },
    },
    attributes: {
      questionId: question.id,
      value: answer,
      pushed: false,
    },
  });

  // We could call SyncDataTask here but we don't want to pull myData after
  // answering every question as that's a lot of unnecessary network traffic.
  if (connected) await pushData();

  await callback(response);
  return response;
};

const moveImagesToDocumentStorage = async (answer) => {
  const movedImages = [];

  for (const image of answer) {
    if (File.hasDocumentsPath(image.uri)) continue;

    const fingerprint = await File.fingerprint(image.uri);
    const extension = File.extension(image.uri);
    const newFilename = `${fingerprint}.${extension}`;

    if (await File.exists(newFilename)) {
      await File.remove(image.uri);
    } else {
      await File.move(image.uri, newFilename);
      movedImages.push(image);
    }

    image.uri = File.path(newFilename);
  }

  return movedImages;
};

export default answerQuestion;
export { moveImagesToDocumentStorage };
