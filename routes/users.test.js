var app = require("../app");
var request = require("supertest");

test("Sign up - Users already exists", async (done) => {
  await request(app)
    .post("/users/sign-up")
    .send({
      firstName: "Johnny",
      lastName: "DoeDoe",
      phoneNumber: "0123456789",
      email: "john.doe@gmail.com",
      password: "blabla",
    });
  await request(app)
    .post("/users/sign-up")
    .send({
      firstName: "Johnny",
      lastName: "DoeDoe",
      phoneNumber: "0123456789",
      email: "john.doe@gmail.com",
      password: "blabla",
    })
    .expect(409)
    .then((response) => {
      expect(response.body.result).toBe(false);
    });
  done();
});

test("Sign up - password is too short", async (done) => {

  await request(app)
    .post("/users/sign-up")
    .send({
      firstName: "Johnny",
      lastName: "DoeDoe",
      phoneNumber: "0123456789",
      email: "john.doe@gmail.com",
      password: "bbb",
    })
    .expect(400)
    .then((response) => {
      expect(response.body.result).toBe(false);
      expect(response.body.error).toBe(`"password" length must be at least 6 characters long`);
    });
  done();
});

test("Sign up - missing field firstName", async (done) => {

  await request(app)
    .post("/users/sign-up")
    .send({
      lastName: "DoeDoe",
      phoneNumber: "0123456789",
      email: "john.doe@gmail.com",
      password: "b",
    })
    .expect(400)
    .then((response) => {
      console.log(response.body.error)
      expect(response.body.result).toBe(false);
      expect(response.body.error).toBe(`"firstName" is required`);
    });
  done();
});

test("Sign up - phone number not valid", async (done) => {

  await request(app)
    .post("/users/sign-up")
    .send({
      firstName: "Johnny",
      lastName: "DoeDoe",
      phoneNumber: "zgvzgz",
      email: "john.doe@gmail.com",
      password: "blabla",
    })
    .expect(400)
    .then((response) => {
      console.log(response.body.error)
      expect(response.body.result).toBe(false);
      expect(response.body.error).toBe(`"phoneNumber" length must be at least 10 characters long`);
    });
  done();
});
