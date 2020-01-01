const SubmissionPeriod = {};
const duration = 24 * 60 * 60 * 1000;

SubmissionPeriod.duration = duration;

SubmissionPeriod.startedAt = (offset=0) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  return new Date(date.getTime() + offset * duration);
};

SubmissionPeriod.endsAt = (offset=0) => {
  const startedAt = SubmissionPeriod.startedAt();
  const endTime = startedAt.getTime() + duration - 1;

  return new Date(endTime + offset * duration);
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

SubmissionPeriod.offset = (date) => {
  const startedAt = SubmissionPeriod.startedAt();
  const sinceStart = new Date(date) - startedAt;
  const periodsAgo = Math.floor(sinceStart / duration);

  return periodsAgo;
};

SubmissionPeriod.partition = (collection, key="objects") => {
  const groups = groupBy(collection, o => SubmissionPeriod.offset(o.createdAt));
  const parts = [];

  for (let [offset, objects] of Object.entries(groups)) {
    const periodStart = SubmissionPeriod.startedAt(offset);
    const periodEnd = SubmissionPeriod.endsAt(offset);

    parts.push({ periodStart, periodEnd, [key]: objects });
  }

  return parts;
};

export default SubmissionPeriod;
