let menuUl = document.getElementById("menu-ul");
let menyOpen = document.getElementById("menu");
let menyClose = document.getElementById("close-menu");

menyOpen.addEventListener("click", function (e) {
    menuUl.style.display = "block";
})

menyClose.addEventListener("click", function (e) {
  menuUl.style.display = "none";
})