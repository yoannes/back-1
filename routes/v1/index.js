const express = require("express")
const { jwtUnSign } = require("../../helpers/jwt")
const Login = require("../../controllers/login")
const Signup = require("../../controllers/signup")
const PutMe = require("../../controllers/putMe")
const GetMe = require("../../controllers/getMe")
const PostMePokemon = require("../../controllers/postMePokemon")

const router = express.Router()

router.get("/", (req, res) => {
  res.send("V1 do nosso API")
})

router.post("/login", Login)
router.post("/signup", Signup)

router.get("/me", jwtUnSign, GetMe)
router.put("/me", jwtUnSign, PutMe)
router.post("/me/pokemons/:pokemonId", jwtUnSign, PostMePokemon)

module.exports = router
