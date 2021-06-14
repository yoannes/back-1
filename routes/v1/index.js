const express = require("express")
const Login = require("../../controllers/login")
const Signup = require("../../controllers/signup")

const router = express.Router()

router.get("/", (req, res) => {
  res.send("V1 do nosso API")
})

router.post("/login", Login)
router.post("/signup", Signup)

module.exports = router
