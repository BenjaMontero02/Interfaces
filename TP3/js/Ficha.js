class Ficha{

    constructor(posX, posY, fill, img ,context, radius, jugador){
        this.posX = posX;
        this.posY = posY;
        this.img = img;
        this.radius = radius;
        this.fill = fill;
        this.ctx = context;
        this.jugador = jugador;
        //this.resaltado = false;
        //this.resaltadoStyle = 'red';
    }

    //Getters & Setters
    getX(){
        return this.posX;
    }

    getY(){
        return this.posY;
    }

    getJugador(){
        return this.jugador;
    }

    getFill(){
        return this.fill;
    }

    getImg(){
        return this.img;
    }

    setPosition(x,y){
        this.posX = x;
        this.posY = y;
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

    setImg(img){
        this.img = img;
    }
    
    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        if(this.img == null){
            this.ctx.fillStyle = this.fill;
            this.ctx.fill();
        }else{
            this.ctx.save();
            this.ctx.clip();
            this.ctx.drawImage(this.img, this.getX() - this.radius, this.getY() - this.radius, this.radius * 2, this.radius * 2);
            this.ctx.restore();
        }
        this.ctx.closePath();
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