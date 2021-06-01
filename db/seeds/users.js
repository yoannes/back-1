exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([{ name: "Fulano 1" }, { name: "Tarou" }, { name: "Silva" }])
    })
}
