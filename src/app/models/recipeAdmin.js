const db = require('../../config/db');
const {
  date
} = require('../../lib/utils');
const File = require('../models/File')

module.exports = {
  all(callback) {
    const query = `
    SELECT recipes.*, chefs.name AS recipe_author,
      (select SUBSTRING(files.path, 8) from recipe_files LEFT JOIN files ON(recipe_files.file_id = files.id) where recipes.id = recipe_files.recipe_id LIMIT 1) AS RECIPE_FILE
    FROM recipes
    LEFT JOIN chefs ON(recipes.chef_id = chefs.id)
    ORDER BY created_at DESC `

    db.query(query, (err, results) => {
      if (err) throw `Erro ao buscar receitas: ${err}`

      callback(results.rows)
    })

  },
  show(id) {

    const query = `
    SELECT recipes.*, chefs.name AS recipe_author
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    WHERE recipes.id='${id}'`

    return db.query(query)
  },
  create(data) {

    const query = `INSERT INTO recipes(
      chef_id,
      title, 
      ingredients, 
      preparation, 
      information,
      created_at
      ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`

    const dados = [
      data.chef_id,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso
    ]

    return db.query(query, dados)

  },
  chefsOption() {

    const query = `SELECT * FROM chefs ORDER BY name ASC`

    return db.query(query)
  },
  edit(id) {
    const query = `SELECT * FROM recipes WHERE id='${id}'`

    return db.query(query)

  },
  update(data) {
    const query = `UPDATE recipes SET 
      chef_id =($1),
      title = ($2),
      ingredients = ($3),
      preparation = ($4),
      information = ($5)
      WHERE id= $6
      RETURNING id`

    const dados = [
      data.chef_id,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.id
    ]

    return db.query(query, dados)
  },
  delete(id) {
    const query = `DELETE FROM recipes WHERE id=${id}`

    return db.query(query)
  },
  files(id) {
    const query = `select recipe_files.*,files.* from recipe_files
LEFT JOIN files ON (recipe_files.file_id = files.id)
WHERE recipe_files.recipe_id = $1`

    return db.query(query, [id])
  }
}