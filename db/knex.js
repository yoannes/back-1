const Knex = require("knex")
const config = require("./knexfile")

knex.on("query", (data) => {
  console.log(data.sql)
})

module.exports = Knex(config)
