const User = require("../models/User")
const Pokemon = require("../models/Pokemon")
const UserPokemon = require("../models/UserPokemon")
const axios = require("axios")

module.exports = async function PostMePokemon(req, res) {
  if (!req.body.price) {
    return res.json({ status: "NO_PRICE" })
  }

  let pokemon = await Pokemon.query().findById(req.params.pokemonId)
  if (!pokemon) {
    const p = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.pokemonId}`)
    pokemon = await Pokemon.query().insert({
      id: p.data.id,
      name: p.data.name,
    })
  }

  const ok = await UserPokemon.query().insert({
    user_id: req.user.id,
    pokemon_id: pokemon.id,
    price: req.body.price,
  })

  return res.status(201).json({
    status: "OK",
    result: {
      id: pokemon.id,
      name: pokemon.name,
      price: parseFloat(ok.price),
    },
  })
}
