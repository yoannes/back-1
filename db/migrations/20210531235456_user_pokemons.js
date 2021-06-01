const { defaultColumns, foreign } = require("../helpers")

exports.up = function (knex) {
  return knex.schema.createTable("user_pokemons", (table) => {
    defaultColumns(knex, table)

    table.decimal("price", 5, 2)

    foreign(table, "pokemon_id", "pokemons")
    foreign(table, "user_id", "users")
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable("user_pokemons")
}
