const express = require("express")
const v1 = require("./v1")

const router = express.Router()

router.get("/", (req, res) => {
  res.send("API backend 1a edição")
})

router.use("/v1", v1)

module.exports = router
