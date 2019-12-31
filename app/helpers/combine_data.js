const combineData = (myData, responses) => {
  const groups = groupBy(responses, r => r.questionId);

  return mapNested(myData, o => {
    if (!o) return o;

    if (typeof o.questionId === "undefined") return o;
    if (typeof o.responses === "undefined") return o;

    const responses = groups[o.questionId] || [];
    o.responses = o.responses.concat(responses);

    return o;
  });
};

export default combineData;
