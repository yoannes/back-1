require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const routes = require("./routes")

const port = process.env.PORT

const app = express()

app.use(cors({ origin: true }))
app.options("*", cors({ origin: true }))

// Automatically parse request body as form data.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Roteador
app.use(routes)

app.listen(port, () => {
  console.log(`Server Started at ${port}`)
})

module.exports = app
