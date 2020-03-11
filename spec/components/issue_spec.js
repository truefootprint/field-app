import Issue from "../../app/components/issue";

describe("<Issue />", () => {
  it("renders", () => {
    render(<Issue />);
  });

  it("mixes in the current user to issue notes without a user", () => {
    const currentUser = { id: 123, name: "current user" };
    const anotherUser = { id: 456, name: "another user" };

    const notes = [
      { text: "first note", photosJson: "[]" },
      { text: "second note", photosJson: "[]", user: anotherUser },
    ];

    const issue = render(<Issue notes={notes} currentUser={currentUser} />);

    expect(issue).toHaveText("current user" + "first note");
    expect(issue).toHaveText("another user" + "second note");
  });
});
