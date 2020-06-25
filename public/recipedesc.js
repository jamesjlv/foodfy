const items = document.querySelectorAll("span")

for (let item of items) {
  item.addEventListener("click", () => {
    const classe = item.parentElement.nextSibling.nextSibling.className;
    const aux = document.getElementsByClassName(classe);
    aux[0].classList.toggle('active');
    const aux2 = item.innerText;
    if (aux2 == "Esconder") {
      item.innerText = "Mostrar";
    } else {
      item.innerText = "Esconder";
    }
  })
}