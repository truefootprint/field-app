const SubmissionPeriod = {};

SubmissionPeriod.startedAt = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  return date;
};

SubmissionPeriod.secondsSinceStart = () => {
  const now = new Date() / 1000;
  const midnight = SubmissionPeriod.startedAt() / 1000;

  return now - midnight;
};

export default SubmissionPeriod;
