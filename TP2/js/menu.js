document.addEventListener("DOMContentLoaded", (event) => {
  let menu = document.getElementById("menu");
  let navMenu = document.getElementById("navMenu");
  let btnCloseMenu = document.getElementById("btn-close-menu");

  let btnAdventure = document.getElementById('item-adventure');
  let navMenuAdventure = document.getElementById('navMenuAdventure');

  let btnProfile = document.getElementById("avatar");
  let navMenuProfile = document.getElementById("navMenuProfile");

  let btnShoppingCart = document.getElementById("shoppingCart");
  let navMenuShoppingCart = document.getElementById("navMenuCart");

  menu.addEventListener("click", () => {
    if (navMenu.style.display === "block") {
      navMenu.style.display = "none";
    } else {
      navMenu.style.display = "block";
      // Calcula la altura del botón y configura la misma altura para el submenu
      var alturaBoton = btnAdventure.offsetTop;
      navMenuAdventure.style.top = alturaBoton + 'px';
    }
  });

  btnCloseMenu.addEventListener("click", () => {
    navMenu.style.display = "none";
    navMenuAdventure.style.display = "none";
  });

  btnProfile.addEventListener("click", () => {
    if (navMenuProfile.style.display === "block") {
      navMenuProfile.style.display = "none";
    } else {
      navMenuProfile.style.display = "block";
    }
  });

  btnAdventure.addEventListener("click", () => {
    if (navMenuAdventure.style.display === "block") {
      navMenuAdventure.style.display = "none";
    } else {
      navMenuAdventure.style.display = "block";
    }
  });

  btnShoppingCart.addEventListener("click", () => {
    if (navMenuShoppingCart.style.display === "block") {
      navMenuShoppingCart.style.display = "none";
    } else {
      navMenuShoppingCart.style.display = "block";
    }
  });
});

function temporizadorDeRetraso() {
  identificadorTiempoDeEspera = setTimeout(funcionConRetraso, 5000);
}

function funcionConRetraso() {
  document.getElementById("onload").remove();
  let div = document.getElementById("bodyRemove");
  div.classList.remove("hidden");
}

temporizadorDeRetraso();
