const { Model } = require("objection")

Model.knex(require("../db/knex"))

class UserPokemon extends Model {
  // id!: number
  // created_at!: string
  // updated_at!: string
  // deleted_at!: number | null
  // price!: number
  // pokemon_id!: number
  // user_id!: number

  static get tableName() {
    return "user_pokemons"
  }

  static get idColumn() {
    return "id"
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name"],

      properties: {
        id: { type: "integer" },
        created_at: { type: "string" },
        updated_at: { type: "string" },
        deleted_at: { type: ["integer", "null"] },
        price: { type: "decimal" },

        pokemon_id: { type: "integer" },
        user_id: { type: "integer" },
      },
    }
  }
}

module.exports = UserPokemon
