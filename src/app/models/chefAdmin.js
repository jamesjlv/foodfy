const db = require("../../config/db");

const {
  date
} = require('../../lib/utils');


module.exports = {
  all(callback) {
    const query = `
    SELECT * FROM chefs ORDER BY name`

    db.query(query, (err, results) => {
      if (err) throw `Erro ao buscar chefs: ${err}`

      callback(results.rows)
    })

  },
  show(id, callback) {

    const query = `
    SELECT * FROM chefs
    WHERE id='${id}'`

    db.query(query, (err, results) => {
      if (err) throw `Erro ao pesquisar a receita, ${err}`

      callback(results.rows[0])
    })

  },
  chefRecipes(id, callback) {
    const query = `
    SELECT recipes.*, chefs.name AS recipe_author
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id=chefs.id)
    WHERE chef_id=${id}`

    db.query(query, (err, results) => {
      if (err) throw `error to find the recipes, ${err}`

      callback(results.rows)
    })
  },
  create(data, callback) {

    const query = `INSERT INTO chefs(
      name,
      avatar_url, 
      created_at
      ) VALUES ($1, $2, $3) RETURNING id`

    const dados = [
      data.name,
      data.avatar_url,
      date(Date.now()).iso
    ]

    db.query(query, dados, (err, results) => {
      if (err) throw `Erro to create a chef: ${err}`

      callback(results.rows[0].id)
    })

  },
  chefsOption(callback) {

    const query = `SELECT * FROM chefs ORDER BY name ASC`

    db.query(query, (err, results) => {
      if (err) throw `Erro ao buscar os chefs: ${err}`

      callback(results.rows)
    })
  },
  edit(id, callback) {
    const query = `SELECT * FROM chefs WHERE id='${id}'`

    db.query(query, (err, results) => {
      if (err) throw `Error to find the chef: ${err}`

      callback(results.rows[0]);
    })

  },
  update(data, callback) {
    const query = `UPDATE chefs SET
      name = ($1),
      avatar_url = ($2)
      WHERE id=$3`

    const dados = [
      data.name,
      data.avatar_url,
      data.id
    ]

    db.query(query, dados, (err, results) => {
      if (err) throw `Erro to update a chef: ${err}`

      callback();

    })

  },
  delete(id, callback) {
    const query = `DELETE FROM chefs WHERE chefs.id = ${id} AND NOT EXISTS(SELECT 1 FROM recipes WHERE chef_id = ${id} LIMIT 1)`

    db.query(query, (err, results) => {
      if (err) throw `Error to delete the chef: ${err}`
      callback(results.rowCount)
    })

  },
  paginate(params) {

  }
}