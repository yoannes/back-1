const defaultColumns = (knex, table) => {
  table.increments("id")

  created(knex, table)
  updated(knex, table)

  table.integer("deleted_at").unsigned().defaultTo(0)
}

const created = (knex, table) => {
  table.timestamp("created_at").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"))
}

const updated = (knex, table) => {
  if (process.env.NODE_ENV === "test") {
    table.timestamp("updated_at").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"))
  } else {
    table
      .timestamp("updated_at")
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
  }
}

const foreign = (table, column, inTable) => {
  table.integer(column).unsigned().references("id").inTable(inTable)
}

module.exports = {
  defaultColumns,
  created,
  updated,
  foreign,
}
