const items = document.querySelectorAll("span")

for (let item of items) {
  item.addEventListener("click", () => {
    console.log("ok");
  })

  // const itemClasse = item.className
  // itemClasse.addEventListener("click", () => {
  //   console.log("ok");
  // })
}