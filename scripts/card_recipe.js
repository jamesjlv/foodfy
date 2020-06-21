//Variavel com o modal para ativar e desativar
const modalRecipe = document.querySelector('.modal_recipe');
//Variavel com os cards para criar o evento de click para abrir o modal
const recipeAll = document.querySelectorAll('.recipe_card');

for (let recipe_card of recipeAll) {
  recipe_card.addEventListener("click", () => {
    const cardImg = recipe_card.getAttribute("id"); // Pega o caminho da imagem para passar ao modal  
    const cardFood = recipe_card.getElementsByTagName("h2"); // Pega o nome da comida que está sempre no h1
    const cardChef = recipe_card.getElementsByTagName("p"); // Pega qual chef criador da comida
    modalRecipe.classList.add('active');
    modalRecipe.querySelector('.modal_img_recipe').src = `./img/${cardImg}.png`;
    modalRecipe.querySelector("h1").textContent = `${cardFood[0].innerHTML}`;
    modalRecipe.querySelector("h2").textContent = `${cardChef[0].innerHTML}`;
  })
}

// Fecha o modal e apaga os itens carregados
document.querySelector('.modal_close').addEventListener("click", () => {
  modalRecipe.classList.remove('active');
  modalRecipe.querySelector('.modal_img_recipe').src = `.`;
  modalRecipe.querySelector("h1").textContent = ``;
  modalRecipe.querySelector("h2").textContent = ``;
})