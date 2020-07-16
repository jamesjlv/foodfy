const Recipes = require('../models/recipe');

module.exports = {
  index(req, res) {

    Recipes.moreAcess((recipes) => {
      return res.render("public/index", {
        recipes
      });
    })

  },

  showRecipes(req, res) {

    Recipes.all((recipes) => {
      return res.render("public/recipe", {
        recipes
      });
    })
  },

  showAbout(req, res) {
    return res.render("public/about");
  },

  recipeDetails(req, res) {
    const id = req.params.id;
    Recipes.showRecipe(id, (recipe) => {
      return res.render("public/recipe_desc", {
        recipe
      });
    })


  }
}