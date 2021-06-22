const { Model } = require("objection")

Model.knex(require("../db/knex"))

class UserPokemon extends Model {
  static get tableName() {
    return "user_pokemons"
  }

  static get idColumn() {
    return "id"
  }

  static get jsonSchema() {
    return {
      type: "object",

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
