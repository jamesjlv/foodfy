const db = require("../../config/db");

const {
  date
} = require('../../lib/utils');


module.exports = {
  all(callback) {
    const query = `
    SELECT chefs.*, files.id AS file_id, files.name AS file_name, SUBSTRING(files.path, 7) AS avatar_url
    FROM chefs
    LEFT JOIN files ON(chefs.file_id = files.id)
    ORDER BY name ASC
    `

    db.query(query, (err, results) => {
      if (err) throw `Erro ao buscar chefs: ${err}`

      callback(results.rows)
    })

  },
  show(id, callback) {

    const query = `
    SELECT chefs.*, files.id AS file_id, files.name AS file_name,SUBSTRING(files.path,7) AS avatar_url
    FROM chefs
    LEFT JOIN files ON (chefs.file_id = files.id)
    WHERE chefs.id='${id}'`

    db.query(query, (err, results) => {
      if (err) throw `Erro ao pesquisar a receita, ${err}`

      callback(results.rows[0])
    })

  },
  chefRecipes(id, callback) {
    const query = `
    SELECT recipes.*, chefs.name AS recipe_author,
      (select SUBSTRING(files.path, 8) from recipe_files LEFT JOIN files ON(recipe_files.file_id = files.id) where recipes.id = recipe_files.recipe_id LIMIT 1) AS RECIPE_FILE
    FROM recipes
    LEFT JOIN chefs ON(recipes.chef_id = chefs.id)
    WHERE recipes.chef_id = ${id}
    ORDER BY TITLE ASC `

    db.query(query, (err, results) => {
      if (err) throw `error to find the recipes, ${err}`

      callback(results.rows)
    })
  },
  create(data, fileAvatar) {

    const query = `INSERT INTO chefs(
      name,
      file_id, 
      created_at
      ) VALUES ($1, $2, $3) RETURNING id`

    const dados = [
      data.name,
      fileAvatar,
      date(Date.now()).iso
    ]

    return db.query(query, dados)

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
  update(data, avatar) {
    const query = `UPDATE chefs SET
      name = ($1),
      file_id = ($2)
      WHERE id=$3`

    const dados = [
      data.name,
      avatar,
      data.id
    ]

    return db.query(query, dados)

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