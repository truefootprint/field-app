import Response from "../models/response";
import Image from "../models/image";
import SubmissionPeriod from "../helpers/submission_period";
import pushData from "./push_data";
import uploadPhoto from "./upload_photo";

const answerQuestion = async ({ connected, question, answer, callback=()=>{} }) => {
  const imagesToUpload = [];

  if (question.type === "PhotoUploadQuestion") {
    for (const image of answer) {
      const filename = File.basename(image.uri);
      const [record, _] = await Image.findOrCreate({ where: { filename } });

      if (!record.pushed) imagesToUpload.push(record);
    }

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
  if (connected) {
    await pushData();

    for (const image of imagesToUpload) {
      await uploadPhoto(image.id);
    };
  }

  await callback(response);
  return response;
};

export default answerQuestion;
