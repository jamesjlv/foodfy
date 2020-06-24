//Variavel com o modal para ativar e desativar
const modalRecipe = document.querySelector('.modal_recipe');
//Variavel com os cards para criar o evento de click para abrir o modal
const recipeAll = document.querySelectorAll('.recipe_card');

for (let recipe_card of recipeAll) {
  recipe_card.addEventListener("click", () => {
    const recipeId = recipe_card.getAttribute("id");
    window.location.href = `/recipe/${recipeId}`
  })
}