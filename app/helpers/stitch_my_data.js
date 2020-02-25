const stitchMyData = (myData, responses, contents) => {
  const responseGroups = groupBy(responses, r => r.projectQuestionId);
  const contentGroups = groupBy(contents, c => [c.subjectType, c.subjectId]);

  return mapNested(myData, o => {
    if (isProjectQuestion(o)) {
      const responses = responseGroups[o.id] || [];
      o.responses = o.responses.concat(responses);
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
