const { Model } = require("objection")

Model.knex(require("../db/knex"))

class User extends Model {
  id!: number
  created_at!: string
  updated_at!: string
  deleted_at!: number | null
  name!: string
  email!: string

  static get tableName() {
    return "users"
  }

  static get idColumn() {
    return "id"
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name", "email"],

      properties: {
        id: { type: "integer" },
        created_at: { type: "string" },
        updated_at: { type: "string" },
        deleted_at: { type: ["integer", "null"] },
        name: { type: "string", maxLength: 45 },
        email: { type: "string", maxLength: 100 },
      },
    }
  }

  static get relationMappings() {
    const Pokemon = require("./Pokemon")
    const UserPokemon = require("./UserPokemon")

    return {
      pokemons: {
        relation: Model.ManyToManyRelation,
        modelClass: Pokemon,
        join: {
          from: "users.id",
          through: {
            ModelClass: UserPokemon,
            from: "user_pokemons.user_id",
            to: "user_pokemons.pokemon_id",
          },
          to: "pokemons.id",
        },
      },
    }
  }

  static get modifiers() {
    return {
      simpleSelect(builder: any) {
        builder.select(["users.id", "users.name"])
      },
    }
  }

  async Load() {
    return this.query().select().limit(10).orderBy("updated_at", "desc")
  }

  async LoadById(id: number) {
    return this.query().select().where("id", id)
  }

  async Insert(content) {
    return this.query().insert(content)
  }
}

module.exports = User
