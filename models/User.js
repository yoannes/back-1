const { Model } = require("objection")
const bcrypt = require("bcrypt")

Model.knex(require("../db/knex"))

const saltRounds = 10
const hashPwd = (pwd) => bcrypt.hashSync(pwd, saltRounds)

class User extends Model {
  static get tableName() {
    return "users"
  }

  static get idColumn() {
    return "id"
  }

  $beforeInsert() {
    if (this.password) {
      this.password = hashPwd(this.password)
    }
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
        password: { type: "string", maxLength: 255 },
        username: { type: "string", maxLength: 100 },
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
      simpleSelect(builder) {
        builder.select(["users.id", "users.name"])
      },
    }
  }

  comparePwd(password) {
    return bcrypt.compareSync(password, this.password)
  }

  static async Load() {
    return User.query().select().limit(10).orderBy("updated_at", "desc")
  }

  static async LoadById(id) {
    return User.query().select().findById(id) // => users
  }

  static async LoadByUser(username) {
    return User.query().select().where("username", username).first()
  }

  async Insert(content) {
    return User.query().insert(content)
  }
}

module.exports = User
