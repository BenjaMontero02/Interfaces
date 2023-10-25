document.addEventListener("DOMContentLoaded" , function () {

    const myCanvas = document.getElementById("myCanvas");
    /** @type {CanvasRenderingContext2D} */
    const ctx = myCanvas.getContext("2d");
    let canvasWidth = myCanvas.width;
    let canvasHeight = myCanvas.height;
    let imgFondo = document.getElementById("fondo");
    let img1 = document.getElementById("img1");
    let img2 = document.getElementById("img2");
    

    //variables del juego
    let fichas = [];
    let tablero = [];
    let gapWidth = 60;
    let gapHeight = 100;
    let total = 0;
    let jugador = ["juan", "claudio"]
    

    //variables p fichaSeleccionada
    let fichaSeleccionada = null;
    let posXFichaAnterior = null;
    let posYFichaAnterior = null;
    let posFicha = null;

    //0 es igual a jugador 1 y 1 es jugador 2
    let turno = 0
    let cantFichas = 6;
    let cantFichasJugador = 10;
    
    // myCanvas.addEventListener("mousemove", (e) => {
    //     console.log("x", e.layerX);
    //     console.log("y", e.layerY);
    // })

    init();
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
        ctx.drawImage(imgFondo, canvasWidth/4, 0, canvasWidth/2, 500);
        drawTablero();
    }

    //lleno el tablero con la cant de posibilidades q se pueden creear
    function llenarTablero(){
        let width = canvasWidth/4 + 50
        let height = canvasHeight -40;
        for(let i = 0; i < cantFichas; i++){
            tablero.push([]);
            for(let j = 0; j < cantFichas; j++){
                tablero[i].push(new Ficha(width, height, "black", ctx, 30, null))
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
            let ficha = new Ficha(width, height, "orange", ctx, 20, jugador[0]);
            fichas.push(ficha);
            height -= 100;
        }
        
        height = canvasHeight - 60;
        width += 120;
        while(fichas.length < cantFichasJugador){
            let ficha = new Ficha(width, height, "orange", ctx, 20, jugador[0]);
            fichas.push(ficha);
            height -= 100;
        }
    }
    //agrego fichas para el jugador 2
    function addFicha2(){
        let width = canvasWidth - 60;
        let height = canvasHeight - 60;
        while(fichas.length-cantFichasJugador < cantFichasJugador/2){
            let ficha = new Ficha(width, height, "blue", ctx, 20, jugador[1]);
            fichas.push(ficha);
            height -= 100;
        }
        
        height = canvasHeight - 60;
        width -= 120;
        while(fichas.length-cantFichasJugador < cantFichasJugador){
            let ficha = new Ficha(width, height, "blue", ctx, 20, jugador[1]);
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
        for(let i = 0; i < cantFichas; i++){
            for(let j = 0; j < cantFichas; j++){
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
        let x = e.layerX - 32
        let y = e.layerY - 80 - 16 - 74.667 - 32
        // let x = 
        for(let i = 0; i < cantFichasJugador; i++){
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

        let x = e.layerX - 32;
        let y = e.layerY - 80 - 16 - 74.667 - 32;

        fichaSeleccionada.setPosition(x, y);
        drawFigure();
    }

    function mouseUp(e){
        if(fichaSeleccionada == null) return;
        let x = e.layerX - 32
        let y = e.layerY - 80 - 16 - 74.667 - 32
        for(let i = 0; i < cantFichas; i++) {
            for(let j = 0; j < cantFichas; j++) {
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
                tablero[i][j].setFill(fichaSeleccionada.getFill());
                tablero[i][j].setJugador(fichaSeleccionada.getJugador());
                fichas.splice(posFicha, 1);
                posFicha = null;
                fichaSeleccionada = null;
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
        if(verifyHorizontal(jugador) || verifyVertical(jugador) /*|| verifyDiagonal()*/){
            setTimeout(() => {
                alert("Ganador: " + jugador);
                init();
            }, 100);
            return
            //setear q termina el juego y lanzar cartel
        }
    }

    //verifican si el jugador por parametro gano 
    function verifyHorizontal(jugador){
        for(let i = 0; i < cantFichas; i++){
            let posible = 0;
            for(let j = 0; j < cantFichas; j++){
                if(tablero[i][j].contieneJugador(jugador)){
                    posible++;
                }else{
                    posible = 0;
                }

                if(posible == cantFichas){
                    return true;
                }
            }
        }
    }

    function verifyVertical(jugador){
        for(let i = 0; i < cantFichas; i++){
            let posible = 0;
            for(let j = 0; j < cantFichas; j++){
                if(tablero[j][i].contieneJugador(jugador)){
                    posible++;
                }else{
                    posible = 0;
                }

                if(posible == cantFichas){
                    return true;
                }
            }
        }
    }

    //sacar variable gano y cantidad afuera de la funcion asi se modifica
    function verifyDiagonal(jugador){
        let i = [];
        let j = [];
        let gano = false;
        backtracking(i, j, 0, 0, jugador, 0, gano);
        return gano;
    }

    //c === columna
    //f === fila
    //columna a variable global
    function backtracking(arrColumna, arrFila, columna, fila, cantidad, gano){
        //si mis arreglos no contienen ese nro 
        if(cantidad === cantFichas){
            if(gano === true) return
            gano = true;
            return
        }else{
            while(gano != true){
            //si mi tablero contiene el jugador q se esta verificando q gano entonces
            // sumo la cant de fichas q va metiendo seguidas 
                if(tablero[columna][fila].contieneJugador(jugador[turno])){
                    cantidad++;
                //o sea si esa ficha esta nula(sin jugador)
                }else if(tablero[columna][fila].contieneJugador("")){
                    cantidad = 0;
                    return;
                }else{
                    cantidad = 0;
                }
                
            }
            return;
        }
    }
    

    function events(){
        myCanvas.onmousedown = mouseDown;
        myCanvas.onmousemove = mouseMove;
        myCanvas.onmouseup = mouseUp;
    }
})
