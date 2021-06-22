const User = require("../models/User")

module.exports = async function GetMe(req, res) {
  const pokemons = await req.user.$relatedQuery("pokemons")

  return res.json({
    status: "OK",
    result: {
      id: req.user.id,
      name: req.user.name,
      username: req.user.username,
      email: req.user.email,
      pokemons: pokemons.map((p) => {
        return {
          id: p.id,
          name: p.name,
          price: parseFloat(p.price),
        }
      }),
    },
  })
}
