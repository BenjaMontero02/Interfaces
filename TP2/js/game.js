document.addEventListener("DOMContentLoaded" , function () {

    const myCanvas = document.getElementById("myCanvas");
    const ctx = myCanvas.getContext("2d");
    let canvasWidth = myCanvas.width;
    let canvasHeight = myCanvas.height;

    //variables del juego
    let fichas1 = [];
    let fichas2 = [];
    let tablero = [[]];
    let gapWidth = 30;
    let gapHeight = 30;
    let total = 1;

    //1 es igual a jugador 1 y 2 es jugador 2
    let turno = 1
    let cantFichas = 4;
    

    init();
    function init(){
        console.log(canvasWidth)
        console.log(canvasHeight)
        addFicha();
        drawFigure();
    }

    function addFicha(){
        let width = 0;
        let height = 0
        let bg = "red";

        while(fichas1.length < cantFichas && fichas2.length < cantFichas){
            width = 0 + total * gapHeight;
            height = 0 + total * gapHeight;

            let ficha1 = new Ficha(width, height, bg, ctx, 10);
            fichas1.push(ficha1);

            width = canvasWidth - total * gapWidth;
            height = canvasHeight - total * gapHeight;
            let ficha2 = new Ficha(width, height, bg, ctx, 10);
            fichas2.push(ficha2);

            total++;

        }
    }

    function drawFigure(){
        clearCanvas();
        for(let i = 0; i < fichas1.length; i++){
            fichas1[i].draw();
        }
        for(let i = 0; i < fichas2.length; i++){
            fichas2[i].draw();
        }
    }

    function clearCanvas(){
        ctx.fillStyle = "black";
    }






})