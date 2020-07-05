const express = require('express');
const routes = express.Router();
const recipes = require('./controller/recipes')
const recipesAdmin = require('./controller/recipesAdmin')

// Rotas páginas para o publico
routes.get('/', recipes.index);
routes.get('/recipe', recipes.showRecipes);
routes.get('/about', recipes.showAbout);
routes.get('/recipe/:id', recipes.recipeDetails);

// Rotas para administração do site
routes.get("/admin/recipes", recipesAdmin.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipesAdmin.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipesAdmin.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipesAdmin.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes", recipesAdmin.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipesAdmin.put); // Editar uma receita
routes.delete("/admin/recipes", recipesAdmin.delete); // Deletar uma receita

module.exports = routes