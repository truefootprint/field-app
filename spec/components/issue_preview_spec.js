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

  describe("when the issue is open", () => {
    const photosJson = JSON.stringify([{ uri: "url/photo.jpg", md5: "md5-fingerprint" }]);
    const issue = { versionedContent: { text: "issue description", photosJson } };

    it("sets the checkbox text to 'Issue recorded'", () => {
      const preview = render(<IssuePreview issue={issue} />);
      const checkbox = preview.getByTestId("checkbox");

      expect(checkbox).toHaveText("Issue recorded");
    });

    it("shows the issue description", () => {
      const preview = render(<IssuePreview issue={issue} />);
      const description = preview.getByTestId("description");

      expect(description).toHaveText("issue description");
    });

    it("shows the photo", () => {
      const preview = render(<IssuePreview issue={issue} />);
      const images = preview.queryAllByType("Image");

      expect(images.length).toBe(1);
    });

    it("does not break if there is no photo", () => {
      const issue = { versionedContent: { text: "description" }};
      const preview = render(<IssuePreview issue={issue} />);
      const images = preview.queryAllByType("Image");

      expect(images.length).toBe(0);
    });
  });

  describe("when the issue is resolved", () => {
    const photosJson = JSON.stringify([{ uri: "url/photo.jpg", md5: "md5-fingerprint" }]);
    const issue = { versionedContent: { text: "issue description", photosJson }, resolutions: [{}] };

    it("sets the checkbox text to 'Issue resolved'", () => {
      const preview = render(<IssuePreview color="green" issue={issue} />);
      const checkbox = preview.getByTestId("checkbox");

      expect(checkbox).toHaveText("Issue resolved");
    });

    it("hides the issue description", () => {
      const preview = render(<IssuePreview issue={issue} />);
      const description = preview.queryByTestId("description");

      expect(description).toBeNull();
    });

    it("does not show the photo", () => {
      const preview = render(<IssuePreview issue={issue} />);
      const images = preview.queryAllByType("Image");

      expect(images.length).toBe(0);
    });
  });
});
