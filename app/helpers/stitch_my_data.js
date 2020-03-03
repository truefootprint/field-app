const stitchMyData = (myData, responses) => {
  const responseGroups = groupBy(responses, r => r.projectQuestionId);

  return mapNested(myData, o => {
    if (isProjectQuestion(o)) {
      const responses = responseGroups[o.id] || [];
      o.responses = o.responses.concat(responses);
    }

    return o;
  });
};

const isProjectQuestion = (o) => (
  o && typeof o.responses !== "undefined"
);

export default stitchMyData;
