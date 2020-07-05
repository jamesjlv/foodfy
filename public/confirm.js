 const formDelete = document.querySelector(".formDelete");
 formDelete.addEventListener("submit", function (event) {
   const confirmation = confirm("Deseja realmente deletar?");
   if (!confirmation) {
     event.preventDefault()
   }
 })