const { defaultColumns } = require("../helpers")

exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    defaultColumns(knex, table)

    table.string("name", 45)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable("users")
}
