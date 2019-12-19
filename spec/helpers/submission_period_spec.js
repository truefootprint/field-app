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
});
