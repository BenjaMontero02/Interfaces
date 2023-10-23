document.addEventListener("DOMContentLoaded" , function () {

    const myCanvas = document.getElementById("myCanvas");
    const ctx = myCanvas.getContext("2d");
    let canvasWidth = myCanvas.width;
    let canvasHeight = myCanvas.height;
    let imgFondo = document.getElementById("fondo");
    let img1 = document.getElementById("img1");
    let img2 = document.getElementById("img2");
    let jugadorUno = "juan"
    let jugadorDos = "claudio"

    //variables del juego
    let fichas = [];
    let tablero = [];
    let gapWidth = 60;
    let gapHeight = 100;
    let total = 0;

    //1 es igual a jugador 1 y 2 es jugador 2
    let turno = 1
    let cantFichas = 7;
    let cantFichasJugador = 10;
    
    // myCanvas.addEventListener("mousemove", (e) => {
    //     console.log("x", e.layerX);
    //     console.log("y", e.layerY);
    // })

    init();
    function init(){
        console.log(canvasWidth)
        console.log(canvasHeight)
        addFicha();
        addFicha2();
        llenarTablero();
        drawImg()
        drawFigure();
        drawTablero();
        events();
    }

    //dibujo la img
    function drawImg(){
        ctx.drawImage(imgFondo, canvasWidth/4, 0, canvasWidth/2, 500);
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
            let ficha = new Ficha(width, height, "orange", ctx, 20, jugadorUno);
            fichas.push(ficha);
            height -= 100;
            total++;
        }
        
        height = canvasHeight - 60;
        width += 120;
        while(fichas.length < cantFichasJugador){
            let ficha = new Ficha(width, height, "orange", ctx, 20, jugadorUno);
            fichas.push(ficha);
            height -= 100;
        }
    }
    //agrego fichas para el jugador 2
    function addFicha2(){
        let width = canvasWidth - 60;
        let height = canvasHeight - 60;
        while(fichas.length-cantFichasJugador < cantFichasJugador/2){
            let ficha = new Ficha(width, height, img1, ctx, 20, jugadorDos);
            fichas.push(ficha);
            height -= 100;
            total++;
        }
        
        height = canvasHeight - 60;
        width -= 120;
        while(fichas.length-cantFichasJugador < cantFichasJugador){
            let ficha = new Ficha(width, height, img1, ctx, 20, jugadorDos);
            fichas.push(ficha);
            height -= 100;
        }
    }
    
    //dibujo todo lo necesario para comenzar
    function drawFigure(){
        clearCanvas();
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

    

    function mouseDown(e){
        let x = e.layerX - 32
        let y = e.layerY - 80 - 16 - 74.667 - 32
        console.log(e);
        fichas.forEach(ficha => {
            if(ficha.isPositionInside(x, y)){
                console.log(true);
                return true;
            }
        });
    }

    //verifica si gano el jugador q se le pase x parametro
    function verifyGanador(jugador){
        if(verifyHorizontal(jugador) || verifyVertical(jugador) || verifyDiagonal()){
            return "Ganador: " + jugador;
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

    function verifyDiagonal(jugador){
        let i = [];
        let j = [];
    }

    function backtracking(){

    }

    function events(){
        myCanvas.onmousedown = mouseDown;
    }
})
