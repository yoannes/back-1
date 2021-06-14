const Knex = require("knex")
const config = require("./knexfile")

// Knex.on("query", (data) => {
//   console.log(data.sql)
// })

module.exports = Knex(config)
