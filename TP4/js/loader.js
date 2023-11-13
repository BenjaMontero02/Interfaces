const container = document.getElementById("container-loader")
const estructuraIzq = document.querySelector(".estructuraIzq")
const estructuraDer = document.querySelector(".estructuraDer")
const estructuraAbajo = document.querySelector(".estructuraAbajo")
const spiderWoman = document.querySelector(".spider-woman")
const spider = document.querySelector(".spider")
const spiderMen = document.querySelector(".spider-men")


function charge() {
    setTimeout(() => {
        container.style.display = "none";
        setKeyFrames();
        habilitarScroll()
    }, 5000)
}

function bloquearScroll() {
    document.body.style.overflow = 'hidden';
}

// Función para desbloquear el scroll
function habilitarScroll() {
    document.body.style.overflow = ''; // Restablecer a la configuración predeterminada
}

bloquearScroll()
charge();


function setKeyFrames(){
    estructuraIzq.style.animation = "estructura-izq 1.5s ease-in-out";
    estructuraDer.style.animation = "estructura-der 1.5s ease-in-out";
    estructuraAbajo.style.animation = "entradaBack 1.5s ease-in-out";
    spiderWoman.style.animation = "entrada 1.5s ease-in-out";
    spider.style.animation = "entrada 1.5s ease-in-out";
    spiderMen.style.animation = "entrada 1.5s ease-in-out";
}