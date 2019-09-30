exports.formatDates = list => {
  if (list.length === 0) return [];
  return list.map(element => {
    let copyElement = { ...element };
    copyElement["created_at"] = new Date(element.created_at)
      .toISOString()
      .slice(0, 22);
    return copyElement;
  });
};

exports.makeRefObj = list => {
  if (list) {
    if (list.length === 0) return {};
    const copyList = [...list];
    const referenceObject = Object.create(Object.prototype);
    copyList.forEach(element => {
      referenceObject[element.title] = element.article_id;
    });
    return referenceObject;
  }
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(comment => {
    let commentCopy = { ...comment };
    // creating 'author' property
    commentCopy["author"] = commentCopy.created_by;
    // delete now redundant 'created_by' property
    delete commentCopy["created_by"];
    // assign value of 'belongs_to' to a new property of 'article_id'
    commentCopy["article_id"] = commentCopy.belongs_to;
    // assign new value to 'article_id' using reference object i.e. articleRef in the input
    commentCopy["article_id"] = articleRef[commentCopy.belongs_to];
    // delete now redundant 'belongs_to' property
    delete commentCopy["belongs_to"];
    // change created_at value to an acceptable format
    let processedDate = new Date(commentCopy.created_at)
      .toISOString()
      .slice(0, 22);
    commentCopy.created_at = processedDate;
    return commentCopy;
  });
};
