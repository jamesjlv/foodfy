const fs = require('fs');
const data = require('../data.json');

exports.index = (req, res) => {
  return res.render("admin/index", {
    recipes: data.recipes
  });
}

exports.create = (req, res) => {
  return res.render("admin/create");
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

  data.recipes.push({
    ...req.body
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Não conseguiu escrever");
    return res.redirect("/admin/recipes")
  })

}

exports.show = (req, res) => {

  const id = req.params.id;

  const recipe = data.recipes[id];

  return res.render("admin/show.njk", {
    recipe,
    id
  });
}

exports.edit = (req, res) => {
  const id = req.params.id
  const recipe = data.recipes[id]
  return res.render("admin/edit.njk", {
    recipe,
    id
  })
}

exports.put = (req, res) => {
  const id = req.body.id;

  data.recipes[id] = {
    ...req.body,
    title: data.recipes[id].title,
    author: data.recipes[id].author
  }

  return res.redirect(`/admin/recipes/${id}`)
}

exports.delete = (req, res) => {
  const id = req.body.id;

  data.recipes.splice(id, 1);

  return res.redirect("/admin/recipes");
}