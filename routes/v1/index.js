const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
  res.send("V1 do nosso API")
})

router.post("/login", (req, res) => {
  console.log("[/login]...", req.body)
  return res.json({ status: "WRONG_USER" })
})

module.exports = router
