const RecipeAdmin = require('../models/recipeAdmin')


exports.index = (req, res) => {

  RecipeAdmin.all((recipes) => {
    return res.render("admin/recipes/index", {
      recipes
    });
  })
}

exports.create = (req, res) => {

  RecipeAdmin.chefsOption((chefs) => {
    return res.render("admin/recipes/create", {
      chefs
    });
  })
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

  RecipeAdmin.create(req.body, (id) => {
    return res.redirect(`/admin/recipes/${id}`)
  })



}

exports.show = (req, res) => {

  const id = req.params.id;

  RecipeAdmin.show(id, (recipe) => {
    return res.render("admin/recipes/show.njk", {
      recipe,
      id
    });
  })
}

exports.edit = (req, res) => {
  const id = req.params.id

  RecipeAdmin.edit(id, (recipe) => {
    RecipeAdmin.chefsOption((chefs) => {
      return res.render("admin/recipes/edit.njk", {
        recipe,
        id,
        chefs
      })
    })

  })

}

exports.put = (req, res) => {

  RecipeAdmin.update(req.body, (id) => {
    return res.redirect(`/admin/recipes/${id}`)
  })

}

exports.delete = (req, res) => {
  const id = req.body.id;

  RecipeAdmin.delete(id, (ok) => {
    return res.redirect("/admin/recipes");
  })

}