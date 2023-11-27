// Opcional 1: La página deberá tener un loader acorde
// a la temática propuesta. Igual al que hicieron en el TPE 2

//TAMBIEN ANIMA LA ENTRADA DEL BANNER CUANDO TERMINA EL LOADER

let container = document.getElementById("container-loader");
let estructuraIzq = document.querySelector(".estructuraIzq");
let estructuraDer = document.querySelector(".estructuraDer");
let estructuraAbajo = document.querySelector(".estructuraAbajo");
let spiderWoman = document.querySelector(".spider-woman");
let spider = document.querySelector(".spider");
let spiderMen = document.querySelector(".spider-men");

function charge() {
  setTimeout(() => {
    container.style.display = "none";
    //ANIMA LA ENTRADA DEL BANNER
    setKeyFrames();
    habilitarScroll();
  }, 5000);
}

function bloquearScroll() {
  document.body.style.overflow = "hidden";
}

// Función para desbloquear el scroll
function habilitarScroll() {
  document.body.style.overflow = ""; // Restablecer a la configuración predeterminada
}

bloquearScroll();
charge();

function setKeyFrames() {
  estructuraIzq.style.animation = "estructura-izq 1.5s ease-in-out";
  estructuraDer.style.animation = "estructura-der 1.5s ease-in-out";
  estructuraAbajo.style.animation = "entradaBack 1.5s ease-in-out";
  spiderWoman.style.animation = "entrada 1.5s ease-in-out";
  spider.style.animation = "entrada 1.5s ease-in-out";
  spiderMen.style.animation = "entrada 1.5s ease-in-out";
}

// Opcional 2: El menú Hamburguesa de la página cuando se despliega se debe transformar
// las 3 líneas en una Cruz, utilizando una animación. (no debe cambiar directamente sino vía una transición)
// Aclaración: al pedir una transición se entiende que debe ser una animación keyframe
// y que pase menú hamburguesa a cruz progresivamente.Si ya lo tenian hecho lo pueden
// reutilizar pero verifiquen que cumpla con todo lo que se pide.
//REALIZADA EN MENU.CSS

// Opcional 3: Los ítems del menú tienen que aparecer desde un
// costado de la pantalla e ir cargándose uno por uno. Los ítems no
// están en Figma, poner mínimo 3 a gusto.

let menuContainer = document.getElementById("menu-container");
let menuBurger = document.getElementById("menuBurger");

menuBurger.addEventListener("click", function () {
  menuBurger.classList.toggle("active");
  menuContainer.classList.toggle("active");

  // Si el menú está visible, ocúltalo; de lo contrario, muéstralo
  let isVisible = menuContainer.classList.contains("active");
  menuContainer.style.left = isVisible ? "0" : "-300px";
});

document.addEventListener("scroll", () => {
  let scrollPosition = window.scrollY;

  stickyHeader(scrollPosition);

  if (scrollPosition < 320) {
    parallaxSpiderAndTelarañaIzq(scrollPosition);
    parallaxEstructuraIzq(scrollPosition);
    parallaxEstructuraDer(scrollPosition);
    parallaxEstructuraAbajo(scrollPosition);
    parallaxNubes(scrollPosition);
    parallaxSpiderMenAndTelarañaDer(scrollPosition);
    parallaxSpiderWoman(scrollPosition);
  }

  duendeVerde(scrollPosition);

  if (scrollPosition > 1400) {
    setCardsFadeIn();
  }

  if (scrollPosition > 1550) {
    cardsGhost(scrollPosition);
  }
});

// Al hacer scroll el Header debe ser sticky y achicarse, de tal manera que
//  además el logo debe achicarse. En caso de ser necesario cambiar el fondo
//  a un color plano (recomendado)

let logo = document.getElementById("logo");
let header = document.getElementById("header");
let logoHeader = document.querySelector(".logoHeader");
function stickyHeader(scrollPosition) {
  logo.style.opacity = 1 - scrollPosition / 60;
  logo.style.scale = 1 - scrollPosition / 100;
  logo.style.transform = `translateY(${-scrollPosition * 6}px)`;
  logoHeader.style.opacity = scrollPosition / 300;

  if (scrollPosition / 300 > 0.5) {
    //cambiar el bg color de header y el height
    header.classList.add("bgSticky");
  } else {
    header.classList.remove("bgSticky");
  }
}

// El héroe debe tener efecto parallax, utilizando las capas de la composición de la
// imagen, moverlas según el scroll, a diferentes velocidades, dando sensación de
// profundidad.Animar también la entrada de los elementos a pantalla.

let spiderParallax = document.getElementById("spider");
let spiderMenParallax = document.getElementById("spiderMen");
let spiderWomanParallax = document.getElementById("spiderWoman");
let estructuraIzqParallax = document.getElementById("estructuraIzq");
let estructuraDerParallax = document.getElementById("estructuraDer");
let estructuraAbajoParallax = document.getElementById("estructuraAbajo");
let nubesParallax = document.getElementById("nubes");
let telaIzqParallax = document.getElementById("telaIzq");
let telaDerParallax = document.getElementById("telaDer");

function parallaxSpiderWoman(scrollPosition) {
  spiderWomanParallax.style.transform = `translateX(${
    -scrollPosition * 0.4
  }px) translateY(${-scrollPosition * 0.4}px)`;
}

function parallaxSpiderMenAndTelarañaDer(scrollPosition) {
  spiderMenParallax.style.transform = `translateX(${
    scrollPosition * 0.2
  }px) translateY(${-scrollPosition * 0.2}px)`;
  telaDerParallax.style.transform = `translateX(${
    scrollPosition * 0.2
  }px) translateY(${-scrollPosition * 0.2}px)`;
}

function parallaxSpiderAndTelarañaIzq(scrollPosition) {
  spiderParallax.style.transform = `translateX(${
    -scrollPosition * 0.2
  }px) translateY(${-scrollPosition * 0.2}px)`;
  telaIzqParallax.style.transform = `translateX(${
    -scrollPosition * 0.2
  }px) translateY(${-scrollPosition * 0.2}px)`;
}

function parallaxEstructuraIzq(scrollPosition) {
  estructuraIzqParallax.style.transform = `translateX(${
    -scrollPosition * 0.3
  }px) translateY(${scrollPosition * 0.8}px)`;
}

function parallaxEstructuraDer(scrollPosition) {
  estructuraDerParallax.style.transform = `translateX(${
    scrollPosition * 0.3
  }px) translateY(${scrollPosition * 0.8}px)`;
}

function parallaxEstructuraAbajo(scrollPosition) {
  estructuraAbajoParallax.style.transform = `translateY(${
    scrollPosition * 0.4
  }px)`;
}

function parallaxNubes(scrollPosition) {
  nubesParallax.style.transform = `translateY(${scrollPosition * 0.15}px)`;
}

// En la sección "Conoce a Spidey y sus sorprendentes amigos", el duende
// verde debe moverse más lento que la velocidad de scroll.

let duende = document.getElementById("duende");

function duendeVerde(scrollPosition) {
  let computedStyle = window.getComputedStyle(duende);

  let top = computedStyle.getPropertyValue("top");

  let value = parseFloat(top);
  if (value > -95) {
    let status = value - scrollPosition * 0.0099;

    if (status > -95) {
      duende.style.top = status + "px";
    } else {
      duende.style.top = -95 + "px";
    }
  }
}

/*En la sección de los cards de los 3 personajes, los cards deben 
aparecer flotados con fade-in, es decir, no se ven inicialmente, y 
cuando se scrollea hasta dejar la sección visible, aparecen sutilmente 
(a diferentes velocidades) los tres cards desde abajo desde un estado transparente.*/

let card = document.getElementById("characters-block-1");
let card2 = document.getElementById("characters-block-2");
let card3 = document.getElementById("characters-block-3");

function setCardsFadeIn() {
  card.classList.add("show");
  setTimeout(() => {
    card2.classList.add("show");
  }, 1500);

  setTimeout(() => {
    card3.classList.add("show");
  }, 2500);
}
document.addEventListener("scroll", () => {
  function clean() {
    document.querySelectorAll(".imgContent").forEach((img) => {
      img.classList.remove("showImg");
    });
    document.querySelectorAll(".texto").forEach((text) => {
      text.classList.remove("showText");
    });
  }
  if (window.scrollY < 4080) {
    clean();
    document.querySelector("#img-1").classList.add("showImg");
    document.querySelector("#text-1").classList.add("showText");
  }
  if (window.scrollY > 4080 && window.screenY < 4450) {
    clean();
    document.querySelector("#img-2").classList.add("showImg");
    document.querySelector("#text-2").classList.add("showText");
  }
  if (window.scrollY > 4450 && window.screenY < 4950) {
    clean();
    document.querySelector("#img-3").classList.add("showImg");
    document.querySelector("#text-3").classList.add("showText");
  }
  if (window.scrollY > 4950) {
    clean();
    document.querySelector("#img-4").classList.add("showImg");
    document.querySelector("#text-4").classList.add("showText");
  }
});

//En la sección Ghost Spider, los 3 cards (en 3D) deben
//desplazarse a destiempo en el scroll, y on hover deben cambiar
//la perspectiva sutilmente.

let contentCards = document.getElementById("content-cards");

function cardsGhost(scrollPosition) {
  let computedStyle = window.getComputedStyle(contentCards);
  let top = computedStyle.getPropertyValue("top");
  let valueTop = parseFloat(top);
  let value = valueTop - scrollPosition * 0.003;
  if (value > 0) {
    contentCards.style.top = value + "px";
  } else {
    contentCards.style.top = 0 + "px";
  }
}

//Opcional 5: En la sección de los tres personajes, debe animarse on hover el personaje, agrandando la
// figura del hover, achicando, cambiar el color del fondo.

const swhite = document.querySelector(".boxSpiderWhite");
const sBlack = document.querySelector(".boxSpiderBlack");
const sRed = document.querySelector(".boxSpiderRed");
const boxBlur = document.querySelector(".boxBlur");
const fondoWhite = document.querySelector(".hoverSpiderWhite");
const fondoBlack = document.querySelector(".hoverSpiderBlack");
const fondoRed = document.querySelector(".hoverSpiderRed");
const arraySpider = [swhite, sBlack, sRed];

const addHoverSpider = (spider) => {
  spider.classList.add("boxSpiderHover");
  boxBlur.classList.add("open");
  arraySpider.forEach((s) => {
    if (s !== spider) {
      s.classList.add("boxSpiderNoHover");
    }
  });
  switch (spider) {
    case swhite:
      fondoWhite.classList.add("openBackground");
      break;
    case sRed:
      fondoRed.classList.add("openBackground");
      break;
    case sBlack:
      fondoBlack.classList.add("openBackground");
      break;
  }
};
const removeHoverSpider = (spider) => {
  arraySpider.forEach((s) => {
    s.classList.remove("boxSpiderNoHover");
    s.classList.remove("boxSpiderHover");
  });
  boxBlur.classList.remove("open");
  switch (spider) {
    case swhite:
      fondoWhite.classList.remove("openBackground");
      break;
    case sRed:
      fondoRed.classList.remove("openBackground");
      break;
    case sBlack:
      fondoBlack.classList.remove("openBackground");
      break;
  }
};
swhite.addEventListener("mouseover", () => {
  addHoverSpider(swhite);
});
sRed.addEventListener("mouseover", () => {
  addHoverSpider(sRed);
});
sBlack.addEventListener("mouseover", () => {
  addHoverSpider(sBlack);
});
sRed.addEventListener("mouseout", () => {
  removeHoverSpider(sRed);
});
swhite.addEventListener("mouseout", () => {
  removeHoverSpider(swhite);
});
sBlack.addEventListener("mouseout", () => {
  removeHoverSpider(sBlack);
});

// En la sección de “Más amigos, más diversión!” Se debe tener 2
// columnas en la cual la parte izquierda es una imagen y sobre la derecha
// está el texto descriptivo. A modo de ejemplo ver en
// https://growproexperience.com/ (Te acompañamos en tu viaje de principio a fin).
// La imagen de la izquierda que fija, Sticky, y va cambiando (con una transición suave)
//  a medida que se prolonga el texto de la derecha.

//REALIZADA EN SECTIONGAMES.CSS

// Animar botones COMPRAR minimamente con un hover con cambio de color.

//REALIZADA EN GENERAL.CSS

// Cerca del footer, animar utilizando un spritesheet un personaje del juego en lanzamiento.
// Algo decorativo, cambiar la animacion on-hover. Spritesheets de ejemplo:

//REALIZADA EN SECTIONSUBSCRIBE.CSS
