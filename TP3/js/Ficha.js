class Ficha{

    constructor(posX, posY, fill, context, radius, jugador){
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.fill = fill;
        this.ctx = context;
        this.jugador = jugador;
    }

    setPosition(x,y){
        this.posX = x;
        this.posY = y;
    }

    getX(){
        return this.posX;
    }

    getY(){
        return this.posY;
    }

    getJugador(){
        return this.jugador;
    }

    setJugador(jugador){
        this.jugador = jugador;
    }

    setRadio(radius){
        this.radius = radius;
    }

    setFill(fill){
        this.fill = fill
    }

    getFill(){
        return this.fill;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.fill;
        //this.ctx.drawImage(this.fill, this.getX()-20, this.getY()-20, 40, 40);
        this.ctx.fill();
    }
    
    isPositionInside(x, y){
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

    contieneJugador(jugador){
        return this.jugador === jugador;
    }

    esNula(){
        return this.jugador == null;
    }

}