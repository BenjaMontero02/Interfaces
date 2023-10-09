"use strict";
let formLogin = document.querySelector(".form-login");

formLogin.addEventListener("submit", function (e) {
  e.preventDefault();

  let mje = document.querySelector(".mje-ingreso");

  mje.classList.remove("none");

  setTimeout(() => {
    window.location.replace("index.html");
  }, 3000);
});
