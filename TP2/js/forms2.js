"use strict";
let formRegister = document.querySelector(".form-register");
formRegister.addEventListener("submit", function (e) {
  e.preventDefault();

  let mje = document.querySelector(".mje-registro");
  console.log(mje);

  mje.classList.remove("none");

  setTimeout(() => {
    window.location.replace("home.html");
  }, 3000);
});
