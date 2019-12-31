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

SubmissionPeriod.filter = (collection) => {
  const startedAt = SubmissionPeriod.startedAt();

  return collection.filter(o => (
    new Date(o.createdAt) >= startedAt
  ));
};

SubmissionPeriod.last = (collection) => {
  const objects = SubmissionPeriod.filter(collection);

  return maxBy(objects, o => new Date(o.createdAt));
};

export default SubmissionPeriod;
