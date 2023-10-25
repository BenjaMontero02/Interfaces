"use strict";
let formLogin = document.querySelector(".hover-shadow");

formLogin.addEventListener("click", function (e) {
  e.preventDefault();

  let mje = document.querySelector(".mje-ingreso");

  mje.classList.remove("none");

  setTimeout(() => {
    window.location.replace("home.html");
  }, 3000);
});
