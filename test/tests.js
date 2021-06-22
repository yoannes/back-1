const expect = require("chai").expect
const request = require("supertest")
const knex = require("../db/knex")
const server = require("../server")

const user = { username: "yo", password: "asd", email: "asd@asd.com", name: "name" }

const loginValidator = (res) => {
  expect(res.body.status).equal("OK")
  expect(res.body.result.id).equal(4)
  expect(res.body.result.username).equal(user.username)
  expect(res.body.result.email).equal(user.email)
  expect(res.body.result.name).equal(user.name)
  expect(res.body.result.token).to.not.equal(null)

  user.id = res.body.result.id
  user.token = res.body.result.token
}

describe("Test", function () {
  // this.timeout(5000)

  before((done) => {
    knex.migrate
      .latest()
      .then(() => knex.seed.run())
      .then(() => {
        done()
      })
      .catch((err) => console.error("[Error migration]...", err))
  })

  describe("Auth", () => {
    it("POST - Signup (NO_NAME)", (done) => {
      request(server)
        .post("/v1/signup")
        .send({})
        .then((res) => {
          // console.log("[b]...", res.body)

          expect(res.statusCode).to.equal(400)
          expect(res.body.status).equal("NO_NAME")

          done()
        })
    })
    it("POST - Signup (NO_EMAIL)", (done) => {
      request(server)
        .post("/v1/signup")
        .send({ name: "asd" })
        .then((res) => {
          // console.log("[b]...", res.body)
          expect(res.statusCode).to.equal(400)
          expect(res.body.status).equal("NO_EMAIL")
          done()
        })
    })
    it("POST - Signup (NO_USER)", (done) => {
      request(server)
        .post("/v1/signup")
        .send({ name: "asd", email: "asd@asd.com" })
        .then((res) => {
          // console.log("[b]...", res.body)
          expect(res.statusCode).to.equal(400)
          expect(res.body.status).equal("NO_USER")
          done()
        })
    })
    it("POST - Signup (NO_PASS)", (done) => {
      request(server)
        .post("/v1/signup")
        .send({ name: "asd", email: "asd@asd.com", username: "asd" })
        .then((res) => {
          // console.log("[b]...", res.body)
          expect(res.statusCode).to.equal(400)
          expect(res.body.status).equal("NO_PASS")
          done()
        })
    })
    it("POST - Signup", (done) => {
      request(server)
        .post("/v1/signup")
        .send(user)
        .then((res) => {
          // console.log("[b]...", res.body)

          expect(res.statusCode).to.equal(201)

          loginValidator(res)

          done()
        })
    })

    it("POST - Login (NO_USER)", (done) => {
      request(server)
        .post("/v1/login")
        .send({})
        .then((res) => {
          // console.log("[b]...", res.body)
          expect(res.statusCode).to.equal(400)
          expect(res.body.status).equal("NO_USER")
          done()
        })
    })
    it("POST - Login (NO_PASS)", (done) => {
      request(server)
        .post("/v1/login")
        .send({ username: user.username })
        .then((res) => {
          // console.log("[b]...", res.body)
          expect(res.statusCode).to.equal(400)
          expect(res.body.status).equal("NO_PASS")
          done()
        })
    })
    it("POST - Login", (done) => {
      request(server)
        .post("/v1/login")
        .send({ username: user.username, password: user.password })
        .then((res) => {
          // console.log("[b]...", res.body)

          expect(res.statusCode).to.equal(200)

          loginValidator(res)

          done()
        })
    })

    it("POST - userPokemon", (done) => {
      request(server)
        .post("/v1/me/pokemons/1")
        .send({ price: 1 })
        .set("Authorization", `Bearer ${user.token}`)
        .then((res) => {
          // console.log("[post userPokemon]...", res.statusCode, res.body)
          expect(res.statusCode).to.equal(201)

          done()
        })
    })

    it("GET - me", (done) => {
      request(server)
        .get("/v1/me")
        .set("Authorization", `Bearer ${user.token}`)
        .then((res) => {
          // console.log("[get me]...", res.statusCode, res.body)
          expect(res.statusCode).to.equal(200)
          expect(res.body.result.id).equal(user.id)
          expect(res.body.result.name).equal(user.name)
          expect(res.body.result.username).equal(user.username)
          expect(res.body.result.email).equal(user.email)

          res.body.result.pokemons.forEach((pokemon) => {
            expect(pokemon.id).equal(1)
            expect(pokemon.price).equal(1)
          })

          done()
        })
    })
  })
})
