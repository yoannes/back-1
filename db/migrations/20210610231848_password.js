exports.up = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.string("password", 255)
  })
}

exports.down = function (knex) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("password")
  })
}
