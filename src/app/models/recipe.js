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
  find(filter, callback) {
    const query = `
    SELECT recipes.*, chefs.name AS recipe_author
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    WHERE recipes.title ILIKE '%${filter}%'
    ORDER BY TITLE ASC`

    db.query(query, (err, results) => {
      if (err) throw `Erro ao buscar receitas: ${err}`

      callback(results.rows)
    })
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

    const {
      filter,
      limit,
      offset,
      callback
    } = params

    let query = "",
      filterQuery = "",
      totalQuery = `(
        SELECT count(*) FROM recipes
        ) AS total`

    if (filter) {
      filterQuery = `
        WHERE recipes.title ILIKE '%${filter}%'`
      totalQuery = `(
        SELECT count(*) FROM recipes
        ${filterQuery}
        ) AS total`
    }

    query = `SELECT recipes.*,chefs.name AS recipe_author, ${totalQuery}
    FROM recipes
    LEFT JOIN chefs ON(recipes.chef_id = chefs.id)
    ${filterQuery}
    LIMIT $1 OFFSET $2`

    db.query(query, [limit, offset], (err, results) => {
      if (err) throw `Error to search the recipes and paginate: ${err}`

      callback(results.rows)
    })


  },
  allChefs(callback) {
    const query = `
    SELECT chefs.*, count(recipes) AS qtd_recipes
    FROM chefs
    LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
    GROUP BY chefs.id
    ORDER BY chefs.name`

    db.query(query, (err, results) => {
      if (err) throw `Erro ao buscar chefs: ${err}`

      callback(results.rows)
    })

  }
}