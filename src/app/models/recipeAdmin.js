const db = require('../../config/db');
const {
  date
} = require('../../lib/utils');


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
  show(id, callback) {

    const query = `
    SELECT recipes.*, chefs.name AS recipe_author
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    WHERE recipes.id='${id}'`

    db.query(query, (err, results) => {
      if (err) throw `Erro ao pesquisar a receita, ${err}`

      callback(results.rows[0])
    })

  },
  create(data, callback) {

    const query = `INSERT INTO recipes(
      chef_id,
      image, 
      title, 
      ingredients, 
      preparation, 
      information,
      created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`

    const dados = [
      data.chef_id,
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso
    ]

    db.query(query, dados, (err, results) => {
      if (err) throw `Erro ao criar a receita: ${err}`

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
    const query = `SELECT * FROM recipes WHERE id='${id}'`

    db.query(query, (err, results) => {
      if (err) throw `Error to find the recipe: ${err}`

      callback(results.rows[0]);
    })

  },
  update(data, callback) {
    const query = `UPDATE recipes SET 
      chef_id =($1),
      image = ($2),
      title = ($3),
      ingredients = ($4),
      preparation = ($5),
      information = ($6)
      WHERE id= $7 
      RETURNING id`

    const dados = [
      data.chef_id,
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.id
    ]

    db.query(query, dados, (err, results) => {
      if (err) throw `Error to update the recipe: ${err}`

      callback(results.rows[0].id)
    })

  },
  delete(id, callback) {
    const query = `DELETE FROM recipes WHERE id=${id}`

    db.query(query, (err, results) => {
      if (err) throw `Error to delete the recipe: ${err}`
      callback();
    })
  },
  paginate(params) {

  }
}