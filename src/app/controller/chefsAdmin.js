const ChefAdmin = require('../models/chefAdmin');


exports.index = (req, res) => {

  ChefAdmin.all((chefs) => {
    return res.render("admin/chefs/chefs.njk", {
      chefs
    })
  })

}

exports.create = (req, res) => {

  return res.render("admin/chefs/create.njk")

}

exports.post = (req, res) => {

  const keys = Object.keys(req.body)

  for (key of keys) {
    //  req.body.key as the same  req.body[key]
    //Validação de dados
    if (req.body[key] == "") {
      return res.send('Please, fill all formulary')
    }
  }

  ChefAdmin.create(req.body, (id) => {
    return res.redirect(`/admin/chefs/${id}`)
  })


}

exports.show = (req, res) => {

  const id = req.params.id;

  ChefAdmin.show(id, (chef) => {
    ChefAdmin.chefRecipes(id, (recipes) => {
      return res.render("admin/chefs/detail.njk", {
        chef,
        recipes
      })
    })
  })

}

exports.edit = (req, res) => {
  const id = req.params.id

  ChefAdmin.edit(id, (chef) => {
    return res.render("admin/chefs/edit.njk", {
      chef
    })
  })

}

exports.put = (req, res) => {
  const id = req.body.id
  ChefAdmin.update(req.body, () => {
    return res.redirect(`/admin/chefs/${id}`)
  })
}

exports.delete = (req, res) => {
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