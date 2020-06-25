const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

const recipes = require("./data");


server.use(express.static('public'));
server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noChache: true,
})

server.get("/", (req, res) => {
  return res.render("index", {
    items: recipes
  });
})

server.get("/recipe", (req, res) => {
  return res.render("recipe", {
    items: recipes
  });
})

server.get("/about", (req, res) => {
  return res.render("about");
})

server.get("/recipe/:id", (req, res) => {
  const id = req.params.id;
  return res.render("recipe_desc", {
    recipe: recipes[id]
  });
})

//Inicia o servidor
server.listen(5000, function () {
  console.log("Server is Runing")
});