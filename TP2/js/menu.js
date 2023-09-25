document.addEventListener("DOMContentLoaded", (event) => {
    let menu = document.getElementById('menu');
    let navMenu = document.getElementById("navMenu");

    menu.addEventListener("click", () => {
        if(menu.style.display === "block"){
            menu.style.display = "none";
            navMenu.style.display = "block";
        }
    })








})