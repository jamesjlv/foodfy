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

    let {
      filter,
      page,
      limit
    } = req.query


    page = page || 1;
    limit = limit || 6;
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(recipes) {
        const pagination = {
          total: Math.ceil(recipes[0].total / limit),
          page
        }
        return res.render("public/recipe", {
          recipes,
          filter,
          pagination
        });

      }
    }
    Recipes.paginate(params)
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


  },

  showChefs(req, res) {
    Recipes.allChefs((chefs) => {
      return res.render("public/chefs.njk", {
        chefs
      });
    })
  },
  find(req, res) {
    let {
      filter,
      page,
      limit
    } = req.query


    page = page || 1;
    limit = limit || 6;
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(recipes) {
        const pagination = {
          total: Math.ceil(recipes[0].total / limit),
          page
        }
        return res.render("public/search.njk", {
          recipes,
          filter,
          pagination
        });

      }
    }
    Recipes.paginate(params)
  }
}