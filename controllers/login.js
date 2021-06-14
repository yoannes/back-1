const User = require("../models/User")

module.exports = async function Login(req, res) {
  console.log("[login]...", req.body)

  if (!req.body.username) {
    return res.status(400).json({ status: "NO_USER" })
  }
  if (!req.body.password) {
    return res.status(400).json({ status: "NO_PASS" })
  }

  const user = await User.LoadByUser(req.body.username)
  if (!user) {
    return res.status(401).json({ status: "USER_NOT_FOUND" })
  }

  if (!user.comparePwd(req.body.password)) {
    return res.status(401).json({ status: "WRONG_PASSWORD" })
  }

  return res.json({ status: "OK" })
}
