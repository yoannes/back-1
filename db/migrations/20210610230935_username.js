exports.up = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.string("username", 100)
  })
}

exports.down = function (knex) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("username")
  })
}
