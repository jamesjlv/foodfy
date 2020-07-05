const recipes = require('../data.json');

exports.index = (req, res) => {
  return res.render("index", {
    items: recipes.recipes
  });
}

exports.showRecipes = (req, res) => {
  return res.render("recipe", {
    items: recipes.recipes
  });
}

exports.showAbout = (req, res) => {
  return res.render("about");
}

exports.recipeDetails = (req, res) => {
  const id = req.params.id;
  return res.render("recipe_desc", {
    recipe: recipes.recipes[id]
  });
}