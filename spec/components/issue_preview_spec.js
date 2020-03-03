import IssuePreview from "../../app/components/issue_preview";
import Attachment from "../../app/models/attachment";
import Downloader from "../../app/components/downloader";

jest.mock("../../app/components/downloader", () => ({
  __esModule: true, default: ({ children }) => children,
}));

describe("<IssuePreview />", () => {
  it("renders", () => {
    render(<IssuePreview />);
  });

  it("applies the theme", () => {
    const preview = render(<IssuePreview color="green" />);
    const expected = palette.green.primary;

    expect(style(preview).borderLeftColor).toBe(expected);
  });

  it("can set an 'onOpen' callback", () => {
    const callback = jest.fn();
    const preview = render(<IssuePreview onOpen={callback} />);
    const button = preview.getByTestId("touchable");

    fireEvent(button, "press");
    expect(callback).toHaveBeenCalled();
  });

  it("shows the issue description", () => {
    const issue = { notes: [{ text: "issue description" }] };
    const preview = render(<IssuePreview issue={issue} />);
    const description = preview.getByTestId("description");

    expect(description).toHaveText("issue description");
  });

  it("sets the checkbox text to 'Issue recorded'", () => {
    const issue = { notes: [{ text: "issue description" }] };
    const preview = render(<IssuePreview issue={issue} />);
    const checkbox = preview.getByTestId("checkbox");

    expect(checkbox).toHaveText("Issue recorded");
  });

  it("sets the checkbox text to 'Issue resolved' when resolved", () => {
    const issue = { resolved: true, notes: [{ text: "issue description" }] };
    const preview = render(<IssuePreview color="green" issue={issue} />);
    const checkbox = preview.getByTestId("checkbox");

    expect(checkbox).toHaveText("Issue resolved");
  });
});
