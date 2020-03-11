const stitchMyData = (myData, responses, issueNotes) => {
  const responsesByQuestion = groupBy(responses, r => r.projectQuestionId);
  const notesBySubject = groupBy(issueNotes, n => [n.subjectType, n.subjectId]);
  const notesByIssue = groupBy(issueNotes, n => n.issueUuid);

  return mapNested(myData, o => {
    if (isProjectQuestion(o)) {
      const responses = responsesByQuestion[o.id] || [];
      o.responses = o.responses.concat(responses);

      const issues = newIssues("ProjectQuestion", o.id, o.issues, notesBySubject);
      o.issues = o.issues.concat(issues);
    }

    if (isIssue(o)) {
      const notes = notesByIssue[o.uuid] || [];
      o.notes = o.notes.concat(notes);
    }

    return o;
  });
};

const newIssues = (subjectType, subjectId, existingIssues, notesBySubject) => {
  const notes = notesBySubject[[subjectType, subjectId]] || [];
  const notesByIssue = groupBy(notes, n => n.issueUuid);

  const existingUuids = new Set(existingIssues.map(i => i.uuid));
  const newIssues = [];

  for (const [uuid, notes] of Object.entries(notesByIssue)) {
    if (existingUuids.has(uuid)) continue;

    newIssues.push({
      uuid,
      subjectType,
      subjectId,
      createdAt: notes[0].createdAt,
      updatedAt: notes[0].updatedAt,
      resolved: notes.some(n => n.resolved),
      notes: [],
    });
  }

  return newIssues;
};

const isProjectQuestion = (o) => (
  o && typeof o.responses !== "undefined"
);

const isIssue = (o) => (
  o && typeof o.resolved !== "undefined" && typeof o.uuid !== "undefined"
);

export default stitchMyData;
