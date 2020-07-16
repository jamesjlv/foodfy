const db = require('../../config/db');


module.exports = {
  all(callback) {
    const query = `
    SELECT recipes.*, chefs.name AS recipe_author
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    ORDER BY TITLE ASC`

    db.query(query, (err, results) => {
      if (err) throw `Erro ao buscar receitas: ${err}`

      callback(results.rows)
    })
  },
  moreAcess(callback) {
    const query = `
    SELECT recipes.*, chefs.name AS recipe_author
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    ORDER BY recipes.id ASC LIMIT 6 `

    db.query(query, (err, results) => {
      if (err) throw `Erro ao buscar receitas: ${err}`

      callback(results.rows)
    })

  },
  find(id, callback) {

  },
  showRecipe(id, callback) {
    const query = `
    SELECT recipes.*, chefs.name AS recipe_author
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    WHERE recipes.id = '${id}'
    ORDER BY TITLE ASC`

    db.query(query, (err, results) => {
      if (err) throw `Erro ao buscar receitas: ${err}`

      callback(results.rows[0])
    })
  },
  paginate(params) {

  }
}