const ChefAdmin = require('../models/chefAdmin');
const File = require('../models/File');



module.exports = {

  index(req, res) {

    ChefAdmin.all((chefs) => {
      return res.render("admin/chefs/chefs.njk", {
        chefs
      })
    })

  },

  create(req, res) {

    return res.render("admin/chefs/create.njk")

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

    const filesAvatar = await File.avatar({
      ...req.files[0]
    })

    const results = await ChefAdmin.create(req.body, filesAvatar.rows[0].id)

    return res.redirect(`/admin/chefs/${results.rows[0].id}`)



  },

  show(req, res) {

    const id = req.params.id;

    ChefAdmin.show(id, (chef) => {
      ChefAdmin.chefRecipes(id, (recipes) => {
        return res.render("admin/chefs/detail.njk", {
          chef,
          recipes
        })
      })
    })

  },

  edit(req, res) {
    const id = req.params.id

    ChefAdmin.edit(id, (chef) => {
      return res.render("admin/chefs/edit.njk", {
        chef
      })
    })

  },

  async put(req, res) {

    const filesAvatar = await File.avatar({
      ...req.files[0]
    })
    await ChefAdmin.update(req.body, filesAvatar.rows[0].id)
    return res.redirect(`/admin/chefs/${req.body.id}`)
  },

  delete(req, res) {
    const id = req.body.id;
    ChefAdmin.delete(id, (condition) => {
      if (condition == 0) {
        return res.send("Exitem receitas relacionadas ao chef.")
      }
      if (condition == 1) {
        return res.redirect("/admin/chefs")
      }
    })
  }
}