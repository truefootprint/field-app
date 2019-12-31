import SubmissionPeriod from "../../app/helpers/submission_period";

describe("SubmissionPeriod", () => {
  const midnight = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };

  it("starts from midnight of the current day", () => {
    expect(SubmissionPeriod.startedAt()).toEqual(midnight());
  });

  it("can return the number of seconds since midnight", () => {
    const currentSeconds = new Date() / 1000;
    const midnightSeconds = midnight() / 1000;

    const delta = currentSeconds - midnightSeconds;

    expect(SubmissionPeriod.secondsSinceStart()).toEqual(delta);
  });

  it("can filter objects created within the submission period", () => {
    const rightNow = { createdAt: new Date().toString() };
    const agesAgo = { createdAt: new Date(0).toString() };

    const result = SubmissionPeriod.filter([rightNow, agesAgo]);
    expect(result).toEqual([rightNow]);
  });

  it("can find the last object created within the submission period", () => {
    const rightNow = { createdAt: new Date().toString() };
    const earlier = { createdAt: midnight().toString() };
    const agesAgo = { createdAt: new Date(0).toString() };

    const result = SubmissionPeriod.last([rightNow, earlier, agesAgo]);
    expect(result).toEqual(rightNow);

    const noResult = SubmissionPeriod.last([agesAgo]);
    expect(noResult).toBeUndefined();
  });
});
