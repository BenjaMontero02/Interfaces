const sectionGhost = document.querySelector(".section-ghost");
const card1 = document.querySelector(".card-1");
const card2 = document.querySelector(".card-2");
const card3 = document.querySelector(".card-3");
window.addEventListener("scroll", function () {
  const pos = sectionGhost.getBoundingClientRect(); //devuelve la posicion
  const desplazamiento = window.scrollY;
  if (pos.top < window.innerHeight && pos.bottom > 0) {
    card1.style.transform = `translateY(${
      (desplazamiento - pos.top) * 0.027
    }px) rotate(-13.078deg)`;
    card2.style.transform = `translateY(${
      (desplazamiento - pos.top) * 0.027
    }px) rotate(-26.474deg)`;
    card3.style.transform = `translateY(${
      (desplazamiento - pos.top) * 0.007
    }px) rotate(-36.016deg)`;
  }
});
