document.addEventListener("DOMContentLoaded", function () {
  const myCanvas = document.getElementById("myCanvas");
  /** @type {CanvasRenderingContext2D} */
  const ctx = myCanvas.getContext("2d");
  let canvasWidth = myCanvas.width;
  let canvasHeight = myCanvas.height;
  let imgFondo = document.getElementById("fondo");
  let img1 = null;
  let img2 = null;
  let playButton = document.getElementById("playButton");
  let optionsButtons = document.querySelectorAll(".option-button");
  let canvasContent = document.querySelector(".canvas-content");
  let btnsImg1 = document.querySelectorAll(".btn-ficha1");
  let btnsImg2 = document.querySelectorAll(".btn-ficha2");
  let modalClose = document.querySelector(".close");
  let modal = document.querySelector(".modal");
  let modalGame = document.getElementById("modalGame");
  let winModal = document.getElementById("winModal");

  //Variables game
  let fichas = [];
  let tablero = [];
  let jugador = ["Player 1", "Player 2"];
  let fichasAGanar = null;
  let ganador = null;

  // variables jugador
  let playerNameHeight = 150;

  // variables timer
  let timerHeight = 80;
  let timerSecond = 300;
  let timer = null;

  //variables p fichaSeleccionada
  let fichaSeleccionada = null;
  let posXFichaAnterior = null;
  let posYFichaAnterior = null;
  let posFicha = null;
  let posColumnaFichaActual = null;
  let posFilaFichaActual = null;

  //TURNO : 0 es igual a jugador 1 y 1 es jugador 2
  let turno = 0;
  let columna = null;
  let fila = null;
  let cantFichasJugador = null;

  optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      fichasAGanar = button.value;
      document.querySelector(".options").style.display = "none";
      if(document.querySelector(".options-img").style.display == "flex"){
        document.querySelector(".options-img").style.display = "none";
      }else{
        document.querySelector(".options-img").style.display = "flex";
      }
      
      playButton.style.display = "block";
    });
  });

  

  //a cada boton(img de ficha para jugador) de mi array de botones le asigno un evento y cuando se clickea, saco todas las clases
  //selected y se la asigno a ese boton
  btnsImg1.forEach((button) => {
    button.addEventListener("click", () => {
      btnsImg1.forEach((btn) => {
        btn.classList.remove("selected");
      });
      button.classList.add("selected");
      img1 = document.getElementById(button.value);
    });
  });

  //a cada boton(img de ficha para jugador) de mi array de botones le asigno un evento y cuando se clickea, saco todas las clases
  //selected y se la asigno a ese boton
  btnsImg2.forEach((button) => {
    button.addEventListener("click", () => {
      btnsImg2.forEach((btn) => {
        btn.classList.remove("selected");
      });
      button.classList.add("selected");
      img2 = document.getElementById(button.value);
    });
  });

  // When the user clicks on <span> (x), close the modal
  modalClose.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  //le asigno el evento al botton jugar
  playButton.addEventListener("click", () => {
    if (img1 !== null && img2 !== null) {
      document.querySelector(".canvas-container").style.display = "block";
      document.querySelector(".options-img").style.display = "none";
      playButton.style.display = "none";
      canvasContent.classList.replace("canvas-content", "canvas-content-init");
      configGame();
    } else {
      modal.style.display = "block";
    }
  });

  //configuro las columnas y filas en base al modo que se eligio
  function configGame() {
    if (fichasAGanar == 4) {
      cantFichasJugador = 12;
      columna = 7;
      fila = 6;
    }
    if (fichasAGanar == 5) {
      cantFichasJugador = 16;
      columna = 8;
      fila = 7;
    }
    if (fichasAGanar == 6) {
      cantFichasJugador = 20;
      columna = 9;
      fila = 8;
    }

    init();
  }

  function init() {
    fichas = [];
    tablero = [];
    addFichas();
    llenarTablero();
    initTablero();
    events();
    setTimer();
  }

  /*
   * addFichas - addFichaJugador
   * addFichas - distribuye las fichas correspondientes a cada jugador con sus params
   * addFichaJugador - crea una instancia de Ficha por cada llamado y establace la relación de altura.
   */
  function addFichas() {
    let radius = 20;
    let marginY =
      (canvasHeight - playerNameHeight - (cantFichasJugador / 2) * radius * 2) /
      (cantFichasJugador / 2 + 1);
    let posY = canvasHeight - radius - marginY;
    for (let i = 0; i < cantFichasJugador * 2; i++) {
      if (i < cantFichasJugador) {
        let posX = i % 2 === 0 ? 60 : 180;
        if (i % 2 === 0) {
          posY -= radius * 2 + marginY;
        }
        let ficha = new Ficha(
          posX,
          posY,
          "orange",
          img1,
          ctx,
          radius,
          jugador[0]
        );
        fichas.push(ficha);
      } else {
        let posX = i % 2 === 0 ? canvasWidth - 60 : canvasWidth - 180;
        if (i === cantFichasJugador) {
          posY = canvasHeight - radius - marginY;
        }
        if (i % 2 === 0) {
          posY -= radius * 2 + marginY;
        }
        let ficha = new Ficha(
          posX,
          posY,
          "blue",
          img2,
          ctx,
          radius,
          jugador[1]
        );
        fichas.push(ficha);
      }
    }
  }

  /*
   * llenarTablero - crea una matriz de fichas "vacias" y ajusta la distancia entre las mismas
   * basandose en el modo de juego
   */

  function llenarTablero() {
    let radius = 30;
    let marginX = ((canvasWidth * 0.6) - (columna * radius * 2)) / (columna + 1);
    let marginY = ((canvasHeight - timerHeight - 20) - (fila * radius * 2)) / (fila + 1);

    let posX = (canvasWidth * 0.2) + radius + marginX;
    let posY = canvasHeight - radius - marginY;
    for (let i = 0; i < columna; i++) {
      tablero.push([]);
      for (let j = 0; j < fila; j++) {
        tablero[i].push(
          new Ficha(posX, posY, "black", null, ctx, radius, null)
        );
        posY -= (radius * 2) + marginY;
      }
      posY = canvasHeight - radius - marginY;
      posX += (radius * 2) + marginX;
    }
  }

  /*
   *  clearCanvas - restear el canvas y carga la imagen de fondo
      lógica tamaño de tablero (1/5 fichas (*0.2) - 3/5 tablero(*0.6) - 1/5 fichas(*0.2))
   */
  function clearCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(imgFondo, (canvasWidth * 0.2), timerHeight + 20, (canvasWidth * 0.6), (canvasHeight - timerHeight - 20));
  }

  /*
   *  initTablero - restear el canvas y carga la imagen de fondo con el timer.
   *  Dibujar el tablero vacio y las fichas de cada jugador.
   */
  function initTablero() {
    //Reset shadow
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    clearCanvas();
    drawTimer();
    drawTablero();
    drawFichas();
    drawJugadores();
  }

  /*
   *  drawJugadores - Setea el estilo del titulo y arma dos textos, uno sobre cada pila de fichas
   */
  function drawJugadores() {
    ctx.font = "30px Roboto";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.shadowColor = "red";
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 7;
    ctx.fillText(jugador[0], canvasWidth * 0.1, 50);
    ctx.fillText(jugador[1], canvasWidth * 0.9, 50);
  }

   /*
   *  drawFichas - Recorre el arreglo de fichas creadas y las dibuja en su pos correspondiente
   *  drawTablero -  Recorre el arreglo de fichas creadas para el tablero y las dibuja en su pos correspondiente
   */

  function drawFichas() {
    for (let i = 0; i < fichas.length; i++) {
      fichas[i].draw();
    }
  }

  function drawTablero() {
    for (let i = 0; i < columna; i++) {
      for (let j = 0; j < fila; j++) {
        tablero[i][j].draw();
      }
    }
  }

  {
    /* TIMER*/
  }

  /*
   *  drawTimer - Dibuja el timer sobre el canvas con degrade y muestra el texto y el segundero.
   */
  function drawTimer() {
    ctx.clearRect(canvasWidth / 2 - 250, 20, 500, timerHeight - 70);
    //Reset shadow
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    var gradient = ctx.createLinearGradient(
      canvasWidth / 2,
      20,
      500,
      timerHeight - 70
    );
    gradient.addColorStop(0, "#0f0829");
    gradient.addColorStop(0.5, "#524487");
    gradient.addColorStop(1, "white");
    ctx.fillStyle = gradient;
    ctx.fillRect(canvasWidth / 2 - 250, 0, 500, timerHeight);
    ctx.font = "30px Roboto";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.textAlign = "center";
    if (ganador) {
      ctx.fillText("Ganador: " + ganador, canvasWidth / 2, timerHeight/2+10);
    } else {
      ctx.fillText(
        "Time of game: " + timerSecond,
        canvasWidth / 2,
        timerHeight/2+10
      );
    }
  }

  /*
   *  setTimer - controla el valor del segundero y re-dibuja el timer.
   */
  function setTimer() {
    timer = setInterval(() => {
      drawTimer();
      timerSecond--;
      if (timerSecond == -1) {
        clearInterval(timer);
        //para que no se ponga un -1 en el timer
        timerSecond++;
        finOfGame();
      }
    }, 1000);
  }

  //si se termino el tiempo(5 minutos) entonces lanzo un modal con la opcion de que 
  //se reincie el juego o se cambie de modo
  function finOfGame(){
    modalGame.style.display = "block";
    let restart = document.getElementById("restartGame");
    let change = document.getElementById("changeMode");

    restart.addEventListener("click", () => {
        init();
        timerSecond = 300;
        modalGame.style.display = "none";
    })

    change.addEventListener("click", () => {
        modalGame.style.display = "none";
        timerSecond = 300;
        document.querySelector(".canvas-container").style.display = "none";
        document.querySelector(".options").style.display = "block";
        canvasContent.classList.replace("canvas-content-init", "canvas-content");
    })
  }

  {
    /* EVENTS */
  }

  /*
   *  mouseDown - Identifico si estoy clickeando sobre una ficha del jugador activo y la guardo como seleccionada
   *  y a su posición.
   */
  function mouseDown(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    for (let i = 0; i < fichas.length; i++) {
      if (
        fichas[i].isPositionInside(x, y) &&
        fichas[i].contieneJugador(jugador[turno])
      ) {
        posXFichaAnterior = fichas[i].getX();
        posYFichaAnterior = fichas[i].getY();
        fichaSeleccionada = fichas[i];
        posFicha = i;
      }
    }
  }

  /*
   *  mouseMove - Si tengo una figura seleccionada voy reiniciando el canvas y asignandole a la ficha la posicion del evento.
   */
  function mouseMove(e) {
    if (fichaSeleccionada == null) return;
    let x = e.offsetX;
    let y = e.offsetY;

    fichaSeleccionada.setPosition(x, y);
    initTablero();
  }

  //si mi fichaSeleccionada no es nula entonces, verifico que este en una posicion de mi matriz de fichas(tablero)
  //si esta en una posicion valida entonces llamo a setFichaTablero()
  //si no esta en una posicion valida entonces la vuelvo a poner en su lugar(x,y) cuando se capturo el evento
  //mouseDown
  function mouseUp(e) {
    if (fichaSeleccionada == null) return;
    let x = e.offsetX;
    let y = e.offsetY;
    for (let i = 0; i < columna; i++) {
      for (let j = 0; j < fila; j++) {
        if (tablero[i][j].isPositionInside(x, y)) {
          setFichaEnTablero(i);
          return;
        }
      }
    }
    fichaSeleccionada = null;
    fichas[posFicha].setPosition(posXFichaAnterior, posYFichaAnterior);
    initTablero();
  }

  //seteo la ficha en el tablero, en la primer posicion disponible, caso de que se complete el for
  //es xq no hay mas lugar en esa columna para colocar fichas, entonces vuelvo a poner la ficha en la posicion
  //que estaba cuando se capturo el evento mouseDown
  function setFichaEnTablero(i) {
    for (let j = 0; j < fila; j++) {
      if (tablero[i][j].esNula()) {
        tablero[i][j].setImg(fichaSeleccionada.getImg());
        tablero[i][j].setJugador(fichaSeleccionada.getJugador());
        fichas.splice(posFicha, 1);
        posFicha = null;
        fichaSeleccionada = null;
        posColumnaFichaActual = i;
        posFilaFichaActual = j;
        initTablero();
        verifyGanador(jugador[turno]);
        //cambio el turno de jugador
        changeTurn();
        return;
      }
    }

    fichaSeleccionada = null;
    fichas[posFicha].setPosition(posXFichaAnterior, posYFichaAnterior);
    initTablero();
  }

  {
    /* TURNOS */
  }

  //cambio el turno del jugador
  function changeTurn() {
    if (turno == 0) {
      turno = 1;
    } else {
      turno = 0;
    }
  }

  {
    /* RECORRIDOS */
  }
  //verifica si gano el jugador q se le pase x parametro
  function verifyGanador(jugador) {
    if (
      verifyHorizontal(jugador) ||
      verifyVertical(jugador) ||
      verifyDiagonal(jugador)
    ) {
      ganador = jugador;
      setTimeout(function () {
        winModalFunction(ganador)
      }, 500);
    }
  }


  //lanzo un modal cuando un jugador gana dandole las opciones para reiniciar o cambiar el modo
  function winModalFunction(ganador){
    winModal.style.display = "block";
    let span = document.getElementById("spanModal");
    span.innerHTML = ganador + " you winner"

    let restart = document.getElementById("restartModal");
    let exit = document.getElementById("exitModal");

    restart.addEventListener("click", () => {
        init();
        timerSecond = 300;
        winModal.style.display = "none";
    })

    exit.addEventListener("click", () => {
        winModal.style.display = "none";
        timerSecond = 300;
        document.querySelector(".canvas-container").style.display = "none";
        document.querySelector(".options").style.display = "block";
        canvasContent.classList.replace("canvas-content-init", "canvas-content");
    })
  }

  //verifican si el jugador por parametro gano
  //cuando seteo la ficha en el tablero guardo la posicion de esa ficha para despues usarla en las funciones
  //para verificar el ganador, lo que hacemos es desde esa posicion si es vertical.. ir hasta la primera posicion posible,
  //cuando llega hasta la primera posicion posible ahi vuelve hasta que se junten la cant de fichas que tenga que tener
  //para ganar o lo maximo que pudo hacer, si el maximo coincide con la cant para ganar, entonces ese jugador gano
  //aplicamos la misma logica para todas las funciones que 
  //verifican el ganador(diagonal(derecha - izquierda), vertica, horizontal)
  function verifyVertical(jugador) {
    let i = posColumnaFichaActual;
    let j = posFilaFichaActual;
    let cant = 0;
    while (j > 0) {
      if (tablero[i][j - 1].contieneJugador(jugador)) {
        j--;
      } else {
        break;
      }
    }

    while (cant != fichasAGanar && j < fila) {
      if (tablero[i][j].contieneJugador(jugador)) {
        cant++;
      } else {
        return false;
      }

      j++;
    }

    return cant == fichasAGanar;
  }

  function verifyHorizontal(jugador) {
    let i = posColumnaFichaActual;
    let j = posFilaFichaActual;
    let cant = 0;
    while (i > 0) {
      if (tablero[i - 1][j].contieneJugador(jugador)) {
        i--;
      } else {
        break;
      }
    }

    while (cant != fichasAGanar && i < columna) {
      if (tablero[i][j].contieneJugador(jugador)) {
        cant++;
      } else {
        return false;
      }

      i++;
    }

    return cant == fichasAGanar;
  }

  function verifyDiagonal(jugador) {
    if (verifyDiagonalIzq(jugador) || verifyDiagonalDer(jugador)) {
      return true;
    }

    return false;
  }

  function verifyDiagonalIzq(jugador) {
    let i = posColumnaFichaActual;
    let j = posFilaFichaActual;
    let cant = 0;

    while (i > 0 && j > 0) {
      if (tablero[i - 1][j - 1].contieneJugador(jugador)) {
        i--;
        j--;
      } else {
        break;
      }
    }

    while (cant != fichasAGanar && i < columna && j < fila) {
      if (tablero[i][j].contieneJugador(jugador)) {
        cant++;
      } else {
        return false;
      }

      i++;
      j++;
    }

    return cant == fichasAGanar;
  }

  function verifyDiagonalDer(jugador) {
    let i = posColumnaFichaActual;
    let j = posFilaFichaActual;
    let cant = 0;

    while (i > 0 && j < fila - 1) {
      if (tablero[i - 1][j + 1].contieneJugador(jugador)) {
        i--;
        j++;
      } else {
        break;
      }
    }

    while (cant != fichasAGanar && i < columna && j != -1) {
      if (tablero[i][j].contieneJugador(jugador)) {
        cant++;
      } else {
        return false;
      }

      i++;
      j--;
    }

    return cant == fichasAGanar;
  }

  //le asigno los eventos basicos al canvas
  function events() {
    myCanvas.onmousedown = mouseDown;
    myCanvas.onmousemove = mouseMove;
    myCanvas.onmouseup = mouseUp;
  }
});
