process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = chai;
const chaiSorted = require("chai-sorted");
const app = require("../app");
const request = require("supertest")(app);
const connection = require("../connection.js");
chai.use(chaiSorted);

beforeEach(() => connection.seed.run());
after(() => connection.destroy());

describe("/strayEndpoints", () => {
  it("custom 404 error with stray endpoint", () => {
    return request
      .get("/hola")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).to.equal("Page not found");
      });
  });
});

describe("/api", () => {
  describe("/topics", () => {
    describe("GET", () => {
      it("status 200", () => {
        return request.get("/api/topics").expect(200);
      });
      it("array with 3 elements returned", () => {
        return request
          .get("/api/topics")
          .expect(200)
          .then(({ body: { topics } }) => {
            expect(topics.length).to.equal(3);
          });
      });
      it("every element is an object with specific properties", () => {
        return request
          .get("/api/topics")
          .expect(200)
          .then(({ body: { topics } }) => {
            topics.forEach(topic => {
              expect(topic).to.have.keys("slug", "description");
            });
          });
      });
    });
    describe("405: unwarranted stray methods", () => {
      it("expect 405 when stray methods attempted", () => {
        const invalidMethods = ["put", "patch", "delete", "post"];
        const methodPromises = invalidMethods.map(method => {
          return request[method]("/api/topics")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Method not allowed");
            });
        });
        return Promise.all(methodPromises);
      });
    });
  });
  describe("/users/:username", () => {
    describe("GET", () => {
      it("status 200 with GET request", () => {
        return request.get("/api/users/icellusedkars").expect(200);
      });
      it("responds with a user object, and the object must have the following keys", () => {
        return request
          .get("/api/users/icellusedkars")
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user).to.eql({
              username: "icellusedkars",
              avatar_url:
                "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
              name: "sam"
            });
            expect(user).to.have.keys("username", "avatar_url", "name");
          });
      });
    });
    describe("405: unwarranted stray methods", () => {
      it("expect 405 when stray methods attempted", () => {
        const invalidMethods = ["put", "patch", "delete", "post"];
        const methodPromises = invalidMethods.map(method => {
          return request[method]("/api/users/icellusedkars")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Method not allowed");
            });
        });
        return Promise.all(methodPromises);
      });
    });
  });
  describe("/articles/:article_id", () => {
    describe("GET", () => {
      it("status 200 with GET request", () => {
        return request.get("/api/articles/1").expect(200);
      });
      it("return article object with specified properties and values", () => {
        return request
          .get("/api/articles/1")
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article).to.have.keys(
              "author",
              "title",
              "article_id",
              "body",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
            expect(article).to.eql({
              article_id: 1,
              title: "Living in the shadow of a great man",
              body: "I find this existence challenging",
              votes: 100,
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2018-11-15T12:21:54.170Z",
              comment_count: "13"
            });
          });
      });
      it("returns 404 if no article found", () => {
        return request
          .get("/api/articles/100")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Page not found");
          });
      });
      it("returns 400 if bad request made i.e. article_id not a number", () => {
        return request
          .get("/api/articles/a")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Bad request");
          });
      });
    });
    describe("PATCH", () => {
      it("status 200 with successful patch", () => {
        return request
          .patch("/api/articles/1")
          .send({ inc_votes: 1 })
          .expect(200);
      });
      it("responds with updated article along with updated values", () => {
        return request
          .patch("/api/articles/1")
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article).to.eql({
              article_id: 1,
              title: "Living in the shadow of a great man",
              body: "I find this existence challenging",
              votes: 101,
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2018-11-15T12:21:54.170Z"
            });
          });
      });
      it("appropriate decrement of votes if inc_votes is a negative value", () => {
        return request
          .patch("/api/articles/1")
          .send({ inc_votes: -1 })
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article).to.eql({
              article_id: 1,
              title: "Living in the shadow of a great man",
              body: "I find this existence challenging",
              votes: 99,
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2018-11-15T12:21:54.170Z"
            });
          });
      });
      it("404 if article_id not found", () => {
        return request
          .patch("/api/articles/1000")
          .send({ inc_votes: -1 })
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Page not found");
          });
      });
      it("400 if bad request i.e. article_id not a number", () => {
        return request
          .patch("/api/articles/a")
          .send({ inc_votes: -1 })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Bad request");
          });
      });
      it("400 if bad request i.e. inc_votes value not a number", () => {
        return request
          .patch("/api/articles/1")
          .send({ inc_votes: "a" })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Bad request");
          });
      });
      it("400 if bad request i.e. attempt to patch with a key that is not `inc_votes`", () => {
        return request
          .patch("/api/articles/1")
          .send({ unknownKey: "a" })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Bad request");
          });
      });
    });
    describe("405 for methods not allowed", () => {
      it("expect 405 when attempts unrecognised methods", () => {
        const invalidMethods = ["put", "post", "delete"];
        const methodPromises = invalidMethods.map(method => {
          return request[method]("/api/articles/1")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Method not allowed");
            });
        });
        return Promise.all(methodPromises);
      });
    });
  });
  describe.only("/api/articles/:article_id/comments", () => {
    describe("POST", () => {
      it("201 for successful post, and item posted is returned", () => {
        return request
          .post("/api/articles/1/comments")
          .send({ username: "mimo", body: "loopy" })
          .expect(201)
          .then(({ body: { comment } }) => {
            expect(comment).to.eql();
          });
      });
    });
  });
  //   describe("/comments", () => {});
});
