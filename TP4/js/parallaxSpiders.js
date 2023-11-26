let spiderParallax = document.getElementById('spider');
let spiderMenParallax = document.getElementById('spiderMen');
let spiderWomanParallax = document.getElementById('spiderWoman');
let estructuraIzqParallax = document.getElementById('estructuraIzq');
let estructuraDerParallax = document.getElementById('estructuraDer');
let estructuraAbajoParallax = document.getElementById('estructuraAbajo');
let nubesParallax = document.getElementById('nubes');
let telaIzqParallax = document.getElementById('telaIzq');
let telaDerParallax = document.getElementById('telaDer');

document.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY;
    if(scrollPosition < 320){
        parallaxSpider(scrollPosition);
        parallaxEstructuraIzq(scrollPosition);
        parallaxEstructuraDer(scrollPosition);
        parallaxEstructuraAbajo(scrollPosition);
        parallaxNubes(scrollPosition);
    }

    if(scrollPosition > 1400){
        setCardsFadeIn();
    }

})

function parallaxSpider(scrollPosition){
    
    var matrizTransformacion = new DOMMatrix(window.getComputedStyle(spiderParallax).getPropertyValue('transform'));

    // Accede a la propiedad de escala en X
    var escalaEnX = matrizTransformacion.a;

    let scale = escalaEnX + scrollPosition * 0.000012;

    if(scale > 1 && scale < 1.3){
        spiderParallax.style.transform = 'scale(' + scale + ')';
    }else if(scale > 1.3){
        spiderParallax.style.transform = 'scale(' + 1.3 + ')';
    }else if(scale < 1){
        spiderParallax.style.transform = 'scale(' + 1 + ')';
    }
}

function parallaxEstructuraIzq(scrollPosition){
    let computedStyle = window.getComputedStyle(estructuraIzqParallax);
    let left = computedStyle.getPropertyValue('left');
    let value = parseFloat(left);
    let top = computedStyle.getPropertyValue('top');
    let valueTop = parseFloat(top);
    estructuraIzqParallax.style.left = value - scrollPosition * 0.004 + 'px';
    estructuraIzqParallax.style.top = valueTop + scrollPosition * 0.004 + 'px';
}

function parallaxEstructuraDer(scrollPosition){
    let computedStyle = window.getComputedStyle(estructuraDerParallax);
    let left = computedStyle.getPropertyValue('left');
    let value = parseFloat(left);
    let top = computedStyle.getPropertyValue('top');
    let valueTop = parseFloat(top);
    estructuraDerParallax.style.left = value + scrollPosition * 0.004 + 'px';
    estructuraDerParallax.style.top = valueTop + scrollPosition * 0.004 + 'px';
}

function parallaxEstructuraAbajo(scrollPosition){
    let computedStyle = window.getComputedStyle(estructuraAbajoParallax);
    let top = computedStyle.getPropertyValue('top');
    let valueTop = parseFloat(top);
    estructuraAbajoParallax.style.top = valueTop + scrollPosition * 0.01 + 'px';
}

function parallaxNubes(scrollPosition){
    if(scrollPosition < 380){
        let computedStyle = window.getComputedStyle(nubesParallax);
        let top = computedStyle.getPropertyValue('top');
        let valueTop = parseFloat(top);
        nubesParallax.style.top = valueTop + scrollPosition * 0.001 + 'px';
    }
}


/*En la sección de los cards de los 3 personajes, los cards deben 
aparecer flotados con fade-in, es decir, no se ven inicialmente, y 
cuando se scrollea hasta dejar la sección visible, aparecen sutilmente 
(a diferentes velocidades) los tres cards desde abajo desde un estado transparente.*/

let card = document.getElementById("characters-block-1")
let card2 = document.getElementById("characters-block-2")
let card3 = document.getElementById("characters-block-3")

function setCardsFadeIn(){
    card.classList.add("show");
    setTimeout(() => {
        card2.classList.add("show");
    }, 2000);

    setTimeout(() => {
        card3.classList.add("show");
    }, 4000);
}