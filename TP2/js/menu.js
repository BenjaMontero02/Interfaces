document.addEventListener("DOMContentLoaded", (event) => {
  let menu = document.getElementById("menu");
  let navMenu = document.getElementById("navMenu");
  let btnCloseMenu = document.getElementById("btn-close-menu");

    let btnProfile = document.getElementById("avatar");
    let navMenuProfile = document.getElementById("navMenuProfile");

    let btnShoppingCart = document.getElementById("shoppingCart");
    let navMenuShoppingCart = document.getElementById("navMenuCart");

    menu.addEventListener("click", () => {
        if (navMenu.style.display === "block") {
            navMenu.style.display = "none";
        } else {
            navMenu.style.display = "block";
        }
    });

    btnCloseMenu.addEventListener("click", () => {
        navMenu.style.display = "none";
    });

    btnProfile.addEventListener("click", () => {
        if(navMenuProfile.style.display === "block") {
            navMenuProfile.style.display = "none";
        }else{
            navMenuProfile.style.display = "block";
        }
    });

    btnShoppingCart.addEventListener("click", () => {
        if(navMenuShoppingCart.style.display === "block") {
            navMenuShoppingCart.style.display = "none";
        }else{
            navMenuShoppingCart.style.display = "block";
        }
    });
});
function temporizadorDeRetraso() {
  identificadorTiempoDeEspera = setTimeout(funcionConRetraso, 5000);
  console.log("asdasd");
}

function funcionConRetraso() {
  document.getElementById("onload").remove();
  var div = document.getElementById("bodyRemove");
  div.classList.remove("hidden");
}

temporizadorDeRetraso();
