document.addEventListener("DOMContentLoaded" , function () {

    const myCanvas = document.getElementById("myCanvas");
    /** @type {CanvasRenderingContext2D} */
    const ctx = myCanvas.getContext("2d");
    let canvasWidth = myCanvas.width;
    let canvasHeight = myCanvas.height;
    let imgFondo = document.getElementById("fondo");
    let img1 = document.getElementById("img1");
    let img2 = document.getElementById("img2");

    let btn_jugar = document.getElementById("playButton");
    let optionsButtons = document.querySelectorAll(".option-button");
    let canvasContent = document.querySelector(".canvas-content");
    
    //variables del juego
    let fichas = [];
    let tablero = [];
    let gapWidth = 60;
    let gapHeight = 100;
    let total = 0;
    let jugador = ["juan", "claudio"]
    let fichasAGanar = null;
    
    //variables p fichaSeleccionada
    let fichaSeleccionada = null;
    let posXFichaAnterior = null;
    let posYFichaAnterior = null;
    let posFicha = null;
    let posColumnaFichaActual = null;
    let posFilaFichaActual = null;

    //TURNO : 0 es igual a jugador 1 y 1 es jugador 2
    let turno = 0
    let columna = null;
    let fila = null;
    let cantFichasJugador = null;

    btn_jugar.addEventListener("click", () => {
        document.querySelector(".options").style.display = "flex";
        document.querySelector(".start-button").style.display = "none";
        
        optionsButtons.forEach(button => {
            button.addEventListener("click", () => {
                fichasAGanar = button.value;
                document.querySelector(".options").style.display = "none";
                document.querySelector(".canvas-container").style.display = "block";
                canvasContent.classList.replace("canvas-content", "canvas-content-init");
                configGame();
            });
        });
    })
    
    // myCanvas.addEventListener("mousemove", (e) => {
    //     console.log("x", e.layerX);
    //     console.log("y", e.layerY);
    // })

    function configGame(){
        if(fichasAGanar == 4){
            cantFichasJugador = 12;
            columna = 7;
            fila = 6;
        }
        if(fichasAGanar == 5){
            cantFichasJugador = 16;
            columna = 8;
            fila = 7;
        }
        if(fichasAGanar == 6){
            cantFichasJugador = 20;
            columna = 9;
            fila = 8;
        }

        init();
    }

    function init(){
        console.log(canvasWidth)
        console.log(canvasHeight)
        fichas = [];
        tablero = [];
        addFicha();
        addFicha2();
        llenarTablero();
        drawImg()
        drawFigure();
        events();
    }

    //dibujo la img
    function drawImg(){
        ctx.drawImage(imgFondo, 350, 100, 1000, 600);
        drawTablero();
    }

    //lleno el tablero con la cant de posibilidades q se pueden creear
    function llenarTablero(){
        let width = canvasWidth/4 + 50
        let height = canvasHeight -40;
        for(let i = 0; i < columna; i++){
            tablero.push([]);
            for(let j = 0; j < fila; j++){
                tablero[i].push(new Ficha(width, height, "black", null, ctx, 30, null))
                height -= 70;
            }

            width += 100
            height = canvasHeight -40;
        }
    }
    //agrego fichas para el jugador 1
    function addFicha(){
        let width = 60;
        let height = canvasHeight - 60;
        while(fichas.length < cantFichasJugador/2){
            let ficha = new Ficha(width, height, "orange", img1, ctx, 20, jugador[0]);
            fichas.push(ficha);
            height -= 100;
        }
        
        height = canvasHeight - 60;
        width += 120;
        while(fichas.length < cantFichasJugador){
            let ficha = new Ficha(width, height, "orange", img1, ctx, 20, jugador[0]);
            fichas.push(ficha);
            height -= 100;
        }
    }
    //agrego fichas para el jugador 2
    function addFicha2(){
        let width = canvasWidth - 60;
        let height = canvasHeight - 60;
        while(fichas.length-cantFichasJugador < cantFichasJugador/2){
            let ficha = new Ficha(width, height, "blue", img2, ctx, 20, jugador[1]);
            fichas.push(ficha);
            height -= 100;
        }
        
        height = canvasHeight - 60;
        width -= 120;
        while(fichas.length-cantFichasJugador < cantFichasJugador){
            let ficha = new Ficha(width, height, "blue", img2, ctx, 20, jugador[1]);
            fichas.push(ficha);
            height -= 100;
        }
    }
    
    //dibujo todo lo necesario para comenzar
    function drawFigure(){
        clearCanvas();
        drawTablero();
        for(let i = 0; i < fichas.length; i++){
            fichas[i].draw();
        }
    }

    //dibujo las fichas del tablero
    function drawTablero(){
        for(let i = 0; i < columna; i++){
            for(let j = 0; j < fila; j++){
                tablero[i][j].draw();
            }
    }}

    //reseteo el canvas
    function clearCanvas(){
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawImg()
    }

    
    //selecciono la ficha en la que estoy clickeadno
    function mouseDown(e){
        //let ClientRect = myCanvas.getBoundingClientRect()
        let x = e.offsetX
        let y = e.offsetY
        console.log(x);
        console.log(y);
        for(let i = 0; i < fichas.length; i++){
            if(fichas[i].isPositionInside(x, y)){
                if(fichas[i].contieneJugador(jugador[turno])) {
                    posXFichaAnterior = fichas[i].getX();
                    posYFichaAnterior = fichas[i].getY();
                    fichaSeleccionada = fichas[i];
                    posFicha = i;
                }
                return
            }
            
        }
    }

    function mouseMove(e){
        if(fichaSeleccionada == null) return;

        let x = e.offsetX
        let y = e.offsetY

        fichaSeleccionada.setPosition(x, y);
        drawFigure();
    }

    function mouseUp(e){
        if(fichaSeleccionada == null) return;
        let x = e.offsetX
        let y = e.offsetY
        for(let i = 0; i < columna; i++) {
            for(let j = 0; j < fila; j++) {
                if(tablero[i][j].isPositionInside(x, y)){
                    setFichaEnTablero(i);
                    return;
                }
            }
        }

        fichaSeleccionada = null;
        fichas[posFicha].setPosition(posXFichaAnterior, posYFichaAnterior);
        drawFigure();
    }

    //seteo la ficha en el tablero, en la primer posicion disponible, caso de que se complete el for
    //es xq no hay mas lugar en esa columna para colocar fichas
    function setFichaEnTablero(i){
        for(let j = 0; j < tablero.length; j++) {
            if(tablero[i][j].esNula()){
                tablero[i][j].setImg(fichaSeleccionada.getImg());
                tablero[i][j].setJugador(fichaSeleccionada.getJugador());
                fichas.splice(posFicha, 1);
                posFicha = null;
                fichaSeleccionada = null;
                posColumnaFichaActual = i;
                posFilaFichaActual = j;
                drawFigure();
                verifyGanador(jugador[turno]);
                
                //cambio el turno del jugador ARREGLAR Y LLEVARLO A UNA FUNCION APARTE Y REINICIAR EL TIMMER
                if(turno === 1){
                    turno = 0;
                }else{
                    turno = 1;
                }
                return
            }
        }
        
        fichaSeleccionada = null;
        fichas[posFicha].setPosition(posXFichaAnterior, posYFichaAnterior);
        drawFigure();
    }

    //verifica si gano el jugador q se le pase x parametro
    function verifyGanador(jugador){
        if(verifyHorizontal(jugador) || verifyVertical(jugador) || verifyDiagonal(jugador)){
            alert("ganador " + jugador)
            //setear q termina el juego y lanzar cartel
        }
    }

    //verifican si el jugador por parametro gano 
    function verifyVertical(jugador){
        let i = posColumnaFichaActual;
        let j = posFilaFichaActual
        let cant = 0;
        while(j > 0){
            if(tablero[i][j-1].contieneJugador(jugador)){
                j--;
            }else{
                break;
            }
        }

        while(cant != fichasAGanar && j < fila){
            if(tablero[i][j].contieneJugador(jugador)){
                cant++
            }else{
                return false;
            }

            j++;
        }

        return cant == fichasAGanar
    }

    function verifyHorizontal(jugador){
        let i = posColumnaFichaActual;
        let j = posFilaFichaActual
        let cant = 0;
        while(i > 0){
            if(tablero[i-1][j].contieneJugador(jugador)){
                i--;
            }else{
                break;
            }
        }

        while(cant != fichasAGanar && i < columna){
            if(tablero[i][j].contieneJugador(jugador)){
                cant++
            }else{
                return false;
            }

            i++;
        }

        return cant == fichasAGanar
    }

    function verifyDiagonal(jugador){
        if(verifyDiagonalIzq(jugador) || verifyDiagonalDer(jugador)){
            return true
        }

            return false
    }

    function verifyDiagonalIzq(jugador){
        let i = posColumnaFichaActual;
        let j = posFilaFichaActual
        let cant = 0;

        while(i > 0 && j > 0){
            if(tablero[i-1][j-1].contieneJugador(jugador)){
                i--;
                j--;
            }else{
                break;
            }
        }

        while(cant != fichasAGanar && (i < columna && j < fila)){
            if(tablero[i][j].contieneJugador(jugador)){
                cant++
            }else{
                return false;
            }

            i++;
            j++;
        }

        return cant == fichasAGanar
    }

    function verifyDiagonalDer(jugador){
        let i = posColumnaFichaActual;
        let j = posFilaFichaActual
        let cant = 0;

        while(i > 0 && j < fila-1){
            if(tablero[i-1][j+1].contieneJugador(jugador)){
                i--;
                j++;
            }else{
                break;
            }
        }

        while(cant != fichasAGanar && (i < columna && j != -1)){
            if(tablero[i][j].contieneJugador(jugador)){
                cant++
            }else{
                return false;
            }

            i++;
            j--;
        }

        return cant == fichasAGanar
    }
    

    function events(){
        myCanvas.onmousedown = mouseDown;
        myCanvas.onmousemove = mouseMove;
        myCanvas.onmouseup = mouseUp;
    }
})
