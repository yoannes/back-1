const { Model } = require("objection")

Model.knex(require("../db/knex"))

class Pokemon extends Model {
  // id!: number
  // created_at!: string
  // updated_at!: string
  // deleted_at!: number | null
  // name!: string

  static get tableName() {
    return "pokemons"
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
        name: { type: "string", maxLength: 45 },
      },
    }
  }

  static get relationMappings() {
    const User = require("./User")
    const UserPokemon = require("./UserPokemon")

    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "pokemons.id",
          through: {
            ModelClass: UserPokemon,
            from: "user_pokemons.pokemon_id",
            to: "user_pokemons.user_id",
          },
          to: "users.id",
        },
      },
    }
  }
}

module.exports = Pokemon
