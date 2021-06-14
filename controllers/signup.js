const User = require("../models/User")

module.exports = async function Signup(req, res) {
  console.log("[signup]...", req.body)

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
    return res.json({ status: "OK" })
  }

  return res.json({ status: "ERROR" })
}
