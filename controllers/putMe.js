const User = require("../models/User")
const { jwtSign } = require("../helpers/jwt")

module.exports = async function Login(req, res) {
  // console.log("[user]...", req.user)
  console.log("[edit user]...", req.body)

  const content = {
    name: req.body.name,
  }

  const user = await User.query().patch(content).findById(req.user.id)
  if (user) {
    const editUser = await User.LoadById(req.user.id)
    return res.json({
      status: "OK",
      result: {
        id: editUser.id,
        name: editUser.name,
        username: editUser.username,
        email: editUser.email,
      },
    })
  }

  return res.json({
    status: "ERROR",
  })
}
