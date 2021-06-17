const { NextFunction, Response, Request } = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const key = "superKey"

const jwtSign = (userId) => {
  const token = jwt.sign({ userId }, key)
  return token
}

const jwtUnSign = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.sendStatus(401)
  }

  const token = req.headers.authorization.split(" ")

  if (token[0] === "Bearer") {
    jwt.verify(token[1], key, async (err, decoded) => {
      if (err || !decoded) {
        return res.sendStatus(401)
      }

      const user = await User.LoadById(decoded.userId)
      if (user) {
        req.user = user
        return next()
      }

      return res.sendStatus(401)
    })
  } else {
    return res.sendStatus(401)
  }
}

module.exports = {
  jwtSign,
  jwtUnSign,
}
