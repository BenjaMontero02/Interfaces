document.addEventListener("DOMContentLoaded", (event) => {
    let menu = document.getElementById('menu');
    let navMenu = document.getElementById("navMenu");
    let btnCloseMenu = document.getElementById("btn-close-menu");

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

});
