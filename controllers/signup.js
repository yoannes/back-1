const User = require("../models/User")
const { jwtSign } = require("../helpers/jwt")

module.exports = async function Signup(req, res) {
  // console.log("[signup]...", req.body)

  if (!req.body.name) {
    return res.status(400).json({ status: "NO_NAME" })
  }
  if (!req.body.email) {
    return res.status(400).json({ status: "NO_EMAIL" })
  }
  if (!req.body.username) {
    return res.status(400).json({ status: "NO_USER" })
  }
  if (!req.body.password) {
    return res.status(400).json({ status: "NO_PASS" })
  }

  const user = await User.query().insert({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  })

  if (user instanceof User) {
    return res.status(201).json({
      status: "OK",
      result: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
        token: jwtSign(user.id),
      },
    })
  }

  return res.json({ status: "ERROR" })
}
