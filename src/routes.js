const express = require("express");
const routes = express.Router();
const multer = require('./app/middlwares/multer')
const recipes = require("./app/controller/recipes");
const recipesAdmin = require("./app/controller/recipesAdmin");
const chefsAdmin = require("./app/controller/chefsAdmin");

// Rotas páginas para o publico
routes.get("/", recipes.index);
routes.get("/recipe", recipes.showRecipes);
routes.get("/about", recipes.showAbout);
routes.get("/recipe/:id", recipes.recipeDetails);
routes.get("/chefs", recipes.showChefs);

routes.get("/search", recipes.find);

// Rotas para administração do site
routes.get("/admin/", (req, res) => {
  return res.redirect("/admin/recipes");
});
routes.get("/admin/recipes", recipesAdmin.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipesAdmin.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipesAdmin.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipesAdmin.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes", multer.array("photos", 5), recipesAdmin.post); // Cadastrar nova receita
routes.put("/admin/recipes", multer.array("photos", 5), recipesAdmin.put); // Editar uma receita
routes.delete("/admin/recipes", recipesAdmin.delete); // Deletar uma receita

// Rotas para a administração dos chefs

routes.get("/admin/chefs", chefsAdmin.index); //Mostra a lista de chefs
routes.get("/admin/chefs/create", chefsAdmin.create); // Mostra o formulário de cadastro do novo chef
routes.get("/admin/chefs/:id", chefsAdmin.show); // Mostra os detalhes do chef
routes.get("/admin/chefs/:id/edit", chefsAdmin.edit); //Edita o cadastro do chef


routes.post("/admin/chefs", multer.array("avatar", 1), chefsAdmin.post); // Cadastra novo Chef
routes.put("/admin/chefs", multer.array("avatar", 1), chefsAdmin.put); // Salva a edição do novo chef
routes.delete("/admin/chefs", chefsAdmin.delete); // Deletar o chef




module.exports = routes;