//Enkel kod för att öppna och stänga menyn i mobilt visningsläge

let menuUl = document.getElementById("menu-ul");
let menyOpen = document.getElementById("menu");
let menyClose = document.getElementById("close-menu");

//EventListener för att öppma meny
menyOpen.addEventListener("click", function (e) {
    menuUl.style.display = "block";
})

//EventListener för att stänga meny
menyClose.addEventListener("click", function (e) {
  menuUl.style.display = "none";
})