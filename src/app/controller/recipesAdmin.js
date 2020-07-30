const RecipeAdmin = require('../models/recipeAdmin')
const File = require('../models/File')


module.exports = {
  index(req, res) {

    RecipeAdmin.all((recipes) => {
      return res.render("admin/recipes/index", {
        recipes
      });
    })
  },
  create(req, res) {

    RecipeAdmin.chefsOption((chefs) => {
      return res.render("admin/recipes/create", {
        chefs
      });
    })
  },
  async post(req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
      //  req.body.key as the same  req.body[key]
      //Validação de dados
      if (req.body[key] == "") {
        return res.send('Please, fill all formulary')
      }
    }

    let results = await RecipeAdmin.create(req.body)
    const recipeId = results.rows[0].id

    const filesPromise = req.files.map(file => File.create({
      ...file,
      recipe_id: recipeId
    }))

    await Promise.all(filesPromise)



    return res.redirect(`/admin/recipes/${recipeId}`)




  },
  async show(req, res) {

    const id = req.params.id;

    let results = await RecipeAdmin.show(id)
    const recipe = results.rows[0]

    if (!recipe) return res.send("Receita não encontrada")

    results = await RecipeAdmin.files(id)
    const files = results.rows.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))

    return res.render("admin/recipes/show.njk", {
      recipe,
      id,
      files
    })
  },
  async edit(req, res) {
    const id = req.params.id

    let results = await RecipeAdmin.edit(id)
    const recipe = results.rows[0]

    results = await RecipeAdmin.chefsOption()
    const chefs = results.rows

    results = await RecipeAdmin.files(id)
    let files = results.rows

    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))


    return res.render("admin/recipes/edit.njk", {
      recipe,
      id,
      chefs,
      files
    })
  },
  async put(req, res) {

    // catch the keys to verify if have any of them empty
    const keys = Object.keys(req.body)

    // Validation to verify if the keys have information
    for (key of keys) {
      if (req.body[key] == "" && key != "photos" && key != "removed_files") {
        return res.send('Please, fill all formulary')
      }
    }

    // Validation to verify if have any images to add
    if (req.files.length != 0) {
      const newFilesPromise = req.files.map(file =>
        File.create({
          ...file,
          recipe_id: req.body.id
        }))
      await Promise.all(newFilesPromise)
    }

    // Validation for look if need to removed any photo
    if (req.body.removed_files) {
      const removedFiles = req.body.removed_files.split(",")
      const lastIndex = removedFiles.length - 1
      removedFiles.splice(lastIndex, 1)
      const removedFilesPromise = removedFiles.map(id => File.delete(id))

      await Promise.all(removedFilesPromise)
    }

    // update the registry
    await RecipeAdmin.update(req.body)


    return res.redirect(`/admin/recipes/${req.body.id}`)
  },
  async delete(req, res) {
    //Call the function to delete the registry
    await RecipeAdmin.delete(req.body.id)

    return res.redirect("/admin/recipes");
  }
}