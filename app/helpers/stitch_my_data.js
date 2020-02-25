const stitchMyData = (myData, responses, contents) => {
  const responseGroups = groupBy(responses, r => r.projectQuestionId);
  const contentGroups = groupBy(contents, c => [c.subjectType, c.subjectId]);

  return mapNested(myData, o => {
    if (isProjectQuestion(o)) {
      const responses = responseGroups[o.id] || [];
      o.responses = o.responses.concat(responses);

      const newIssues = [["ProjectQuestion", "Issue"], o.id]
      const newResolutions = [["ProjectQuestion", "Resolution"], o.id]
    }

    return o;
  });
};

const isProjectQuestion = (o) => (
  o && typeof o.id !== "undefined" && typeof o.responses !== "undefined"
);

export default stitchMyData;
