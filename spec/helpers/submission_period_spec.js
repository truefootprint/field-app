import SubmissionPeriod from "../../app/helpers/submission_period";

describe("SubmissionPeriod", () => {
  const oneDay = SubmissionPeriod.duration;
  const now = new Date();

  const todayStart = (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })();
  const yesterdayStart = new Date(todayStart.getTime() - oneDay);
  const tomorrowStart = new Date(todayStart.getTime() + oneDay);

  const todayEnd = new Date(todayStart.getTime() + oneDay - 1);
  const yesterdayEnd = new Date(yesterdayStart.getTime() + oneDay - 1);
  const tomorrowEnd = new Date(tomorrowStart.getTime() + oneDay - 1);

  it("starts from midnight of the current day", () => {
    expect(SubmissionPeriod.startedAt()).toEqual(todayStart);
  });

  it("can calculate startedAt for a period in the past or future", () => {
    expect(SubmissionPeriod.startedAt(-1)).toEqual(yesterdayStart);
    expect(SubmissionPeriod.startedAt(1)).toEqual(tomorrowStart);
  });

  it("ends at just before midnight of the current day", () => {
    expect(SubmissionPeriod.endsAt()).toEqual(todayEnd);
  });

  it("can calculate endsAt for a period in the past or future", () => {
    expect(SubmissionPeriod.endsAt(-1)).toEqual(yesterdayEnd);
    expect(SubmissionPeriod.endsAt(1)).toEqual(tomorrowEnd);
  });

  it("has a duration of one day", () => {
    expect(SubmissionPeriod.duration).toEqual(24 * 60 * 60 * 1000);
  });

  it("can return the number of seconds since the start", () => {
    const expected = new Date() / 1000 - todayStart / 1000;
    const actual = SubmissionPeriod.secondsSinceStart();

    expect(actual - expected).toBeLessThan(1);
  });

  it("can filter objects created within the submission period", () => {
    const rightNow = { createdAt: now.toString() };
    const agesAgo = { createdAt: new Date(0).toString() };

    const result = SubmissionPeriod.filter([rightNow, agesAgo]);
    expect(result).toEqual([rightNow]);
  });

  it("can find the last object created within the submission period", () => {
    const rightNow = { createdAt: now.toString() };
    const today = { createdAt: todayStart.toString() };
    const yesterday = { createdAt: yesterdayStart.toString() };

    const result = SubmissionPeriod.last([rightNow, today, yesterday]);
    expect(result).toEqual(rightNow);

    const noResult = SubmissionPeriod.last([yesterday]);
    expect(noResult).toBeUndefined();
  });

  it("can calculate the number of submission periods until the date", () => {
    expect(SubmissionPeriod.offset(yesterdayStart)).toBe(-1);
    expect(SubmissionPeriod.offset(yesterdayEnd)).toBe(-1);

    expect(SubmissionPeriod.offset(todayStart)).toBe(0);
    expect(SubmissionPeriod.offset(todayEnd)).toBe(0);

    expect(SubmissionPeriod.offset(now)).toBe(0);

    expect(SubmissionPeriod.offset(tomorrowStart)).toBe(1);
    expect(SubmissionPeriod.offset(tomorrowEnd)).toBe(1);
  });

  it("partitions the objects by the submission period in which they were created", () => {
    const rightNow = { createdAt: now.toString() };
    const today = { createdAt: todayStart.toString() };
    const yesterday = { createdAt: yesterdayStart.toString() };

    const result = SubmissionPeriod.partition([rightNow, today, yesterday]);

    expect(result).toEqual([
      { periodStart: todayStart, periodEnd: todayEnd, objects: [rightNow, today] },
      { periodStart: yesterdayStart, periodEnd: yesterdayEnd, objects: [yesterday] },
    ]);
  });
});
