const db = require("../../config/db");
const fs = require("fs");
module.exports = {
  create({
    filename,
    path,
    recipe_id
  }) {
    const query = `
    INSERT INTO files(
      name,
      path
    ) VALUES ($1, $2)
    RETURNING id
    `;
    const values = [filename, path];

    db.query(query, values, (err, results) => {
      if (err) throw `olha o erro: ${err}`
      const file_id = results.rows[0].id
      const query2 = `INSERT INTO recipe_files(
          recipe_id,
          file_id
        ) VALUES ($1, $2)
        RETURNING id`;

      const dados = [recipe_id, file_id]

      return db.query(query2, dados)

    });
  },
  async delete(id) {
    try {
      const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id]);
      const file = result.rows[0];

      fs.unlinkSync(file.path);
      db.query(`DELETE FROM recipe_files where file_id = $1`, [id]);
      return db.query(`DELETE FROM files where id = $1`, [id]);
    } catch (err) {
      console.error(err);
    }
  },
  avatar({
    filename,
    path
  }) {
    const query = `
    INSERT INTO files(
      name,
      path
    ) VALUES ($1, $2)
    RETURNING id
    `;
    const values = [filename, path];

    return db.query(query, values)

  },
};