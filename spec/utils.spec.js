const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("if given empty array, returns empty array", () => {
    expect(formatDates([])).to.eql([]);
  });
  it("if given a single-element array with an object, the `created_at` value of the object should be converted from UNIX into a Javascript date object", () => {
    const objData = [
      {
        created_at: 11144455667
      }
    ];
    expect(formatDates(objData)).to.eql([
      { created_at: "1970-05-09T23:40:55.66" }
    ]);
  });
  it("check original data not been mutated", () => {
    const objData = [
      {
        created_at: 11144455667
      }
    ];
    formatDates(objData);
    expect(objData[0].created_at).to.equal(11144455667);
  });
  it("if given a multi-element array with multiple objects, the `created_at` value of every object should be converted from UNIX into a Javascript date object", () => {
    const objData = [
      {
        created_at: 11144455667
      },
      {
        created_at: 11144455333
      }
    ];
    expect(formatDates(objData)).to.eql([
      { created_at: "1970-05-09T23:40:55.66" },
      { created_at: "1970-05-09T23:40:55.33" }
    ]);
  });
});

describe("makeRefObj", () => {
  it("if given empty array, returns empty object", () => {
    expect(makeRefObj([])).to.eql({});
  });
  it("if given single-element array, it will create a reference object using `title` value as the key, and `article_id` as the value", () => {
    expect(makeRefObj([{ article_id: 1, title: "A" }])).to.eql({ A: 1 });
  });
  it("check that original data not mutated", () => {
    let inputData = [{ article_id: 1, title: "A" }];
    makeRefObj(inputData);
    expect(inputData).to.eql([{ article_id: 1, title: "A" }]);
  });
  it("if given multi-element array, it will create a reference object with multiple keys: using `title` value as the key, and `article_id` as the value", () => {
    expect(
      makeRefObj([{ article_id: 1, title: "A" }, { article_id: 2, title: "B" }])
    ).to.eql({ A: 1, B: 2 });
  });
});

describe("formatComments", () => {
  it("if given an array, returns array", () => {
    expect(formatComments([])).to.eql([]);
  });
  it("the returned array should be a * new * array", () => {
    const inputArr = [];
    const outputArr = formatComments(inputArr);
    expect(outputArr).to.not.equal(inputArr);
  });
  it("if given a single-elememt array of comment object, and a reference object, the output array will have the specified properties", () => {
    const comments = [
      {
        body: "Itaque",
        belongs_to: "The People",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932
      }
    ];
    const articleRef = {
      "The People": 18
    };
    const outputArr = formatComments(comments, articleRef);
    expect(outputArr).to.eql([
      {
        body: "Itaque",
        article_id: 18,
        author: "tickle122",
        votes: -1,
        created_at: "2016-07-09T18:07:18.93"
      }
    ]);
  });
  it("the input array is not mutated", () => {
    const comments = [
      {
        body: "Itaque",
        belongs_to: "The People",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932
      }
    ];
    const articleRef = {
      "The People": 18
    };
    formatComments(comments, articleRef);
    expect(comments).to.eql([
      {
        body: "Itaque",
        belongs_to: "The People",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932
      }
    ]);
  });
  it("if multi elememt array of comment object given, along with a reference object, the output array will objects with the specified properties", () => {
    const comments = [
      {
        body: "Itaque",
        belongs_to: "The People",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932
      },
      {
        body: "Bobo",
        belongs_to: "The King",
        created_by: "prince",
        votes: -1,
        created_at: 1468087638932
      }
    ];
    const articleRef = {
      "The People": 18,
      "The King": 2
    };
    const outputArr = formatComments(comments, articleRef);
    expect(outputArr).to.eql([
      {
        body: "Itaque",
        article_id: 18,
        author: "tickle122",
        votes: -1,
        created_at: "2016-07-09T18:07:18.93"
      },
      {
        body: "Bobo",
        article_id: 2,
        author: "prince",
        votes: -1,
        created_at: "2016-07-09T18:07:18.93"
      }
    ]);
  });
});
