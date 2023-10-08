document.addEventListener("DOMContentLoaded", (event) => {
    let menu = document.getElementById('share');
    let share = document.querySelector(".share");
    
    menu.addEventListener("click", (e) => {
        e.preventDefault();
        if(share.style.display == "none"){
            share.style.display = "flex";
        }else{
            share.style.display = "none";
        }
    })
});