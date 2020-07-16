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


function paginate(selectedPage, totalPages) {
  let pages = [],
    oldPage

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    const firstAndLastPage = currentPage == 1 || currentPage == totalPages
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

    if (firstAndLastPage || pagesBeforeSelectedPage && pagesBeforeSelectedPage) {
      if (oldPage && currentPage - oldPage > 2) {
        pages.push("...")
      }
      if (oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1)
      }
      pages.push(currentPage)

      oldPage = currentPage
    }
  }
  return pages
}

function createPagination(pagination) {
  const filter = pagination.dataset.filter;
  const page = +pagination.dataset.page;
  const total = +pagination.dataset.total;

  const pages = paginate(page, total)

  let elements = ""

  for (let page of pages) {
    if (String(page).includes("...")) {
      elements += `<span> ${page} </span>`
    } else {
      if (filter) {
        elements += `<a href="?page=${page}&filter=${filter}"> ${page} </a>`
      } else {
        elements += `<a href="?page=${page}"> ${page} </a>`
      }
    }
  }
  pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")

if (pagination) {
  createPagination(pagination)
}