const stitchMyData = (myData, responses, contents) => {
  const responseGroups = groupBy(responses, r => r.projectQuestionId);
  const contentGroups = groupBy(contents, c => [c.subjectType, c.subjectId]);

  return mapNested(myData, o => {
    if (isProjectQuestion(o)) {
      const responses = responseGroups[o.id] || [];
      o.responses = o.responses.concat(responses);

      const issues = newIssues("ProjectQuestion", o.id, contentGroups);
      o.issues = o.issues.concat(issues);

      o.issues.forEach(issue => {
        const resolutions = newResolutions(issue.id, contentGroups);
        issue.resolutions = issue.resolutions.concat(resolutions);
      });
    }

    if (isIssue(o)) {
      const contents = contentGroups[["Issue", o.id]] || [];
      o.versionedContent = newest(contents, o.versionedContent);
    }

    if (isResolution(o)) {
      const contents = contentGroups[["Resolution", o.id]] || [];
      o.versionedContent = newest(contents, o.versionedContent);
    }

    return o;
  });
};

const newIssues = (subjectType, subjectId, contentGroups) => {
  const key = [[subjectType, "Issue"], subjectId];
  const contents = contentGroups[key] || [];

  return contents.map(c => ({
    subjectType,
    subjectId,
    resolutions: [],
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
    versionedContent: {
      ...c,
      subjectType: "Issue",
      subjectId: null,
    },
  }));
};

const newResolutions = (issueId, contentGroups) => {
  const key = [["Issue", "Resolution"], issueId];
  const contents = contentGroups[key] || [];

  return contents.map(c => ({
    issueId,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
    versionedContent: {
      ...c,
      subjectType: "Resolution",
      subjectId: null,
    },
  }));
};

const newest = (contents, existing) => {
  if (existing) contents.push(existing);
  return maxBy(contents, c => c.createdAt);
};

const isProjectQuestion = (o) => (
  o && typeof o.responses !== "undefined"
);

const isIssue = (o) => (
  o && typeof o.versionedContent !== "undefined" && typeof o.issueId === "undefined"
);

const isResolution = (o) => (
  o && typeof o.versionedContent !== "undefined" && typeof o.issueId !== "undefined"
);

export default stitchMyData;
