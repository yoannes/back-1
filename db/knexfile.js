if (!process.env.NODE_ENV) {
  require("dotenv").config({ path: `${__dirname}/../../.env` })
}

console.log("[DB_HOST]...", process.env.DB_HOST)

const typeCast = function (field, next) {
  if (field.type === "BIT" && field.length === 1) {
    const bit = field.string()
    return bit === null ? 0 : bit.charCodeAt(0)
  }

  if (field.type === "TIMESTAMP") {
    const time = field.string()
    if (time) {
      const dateString = time.toString()
      const year = dateString.substring(0, 4)
      const month = dateString.substring(5, 7)
      const day = dateString.substring(8, 10)
      const hour = dateString.substring(11, 13)
      const min = dateString.substring(14, 16)
      const sec = dateString.substring(17, 19)

      return Math.floor(new Date(year, month - 1, day, hour, min, sec).getTime() / 1000)
    }

    return null
  }

  return next()
}

const config = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    typeCast,
  },
  migrations: {
    directory: `${__dirname}/migrations`,
    schemaName: process.env.DB_DATABASE,
    tableName: "knex_migrations",
  },
  seeds: {
    directory: `${__dirname}/seeds`,
  },
}

if (process.env.NODE_ENV === "test") {
  config.client = "sqlite3"
  config.connection = ":memory:"
  config.useNullAsDefault = true
  delete config.migrations.schemaName
}

module.exports = config
