const express = require("express")
const { jwtUnSign } = require("../../helpers/jwt")
const Login = require("../../controllers/login")
const Signup = require("../../controllers/signup")
const PutMe = require("../../controllers/putMe")

const router = express.Router()

router.get("/", (req, res) => {
  res.send("V1 do nosso API")
})

router.post("/login", Login)
router.post("/signup", Signup)

router.put("/me", jwtUnSign, PutMe)

module.exports = router
