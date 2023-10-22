class Ficha{

    constructor(posX, posY, fill, context, radius){
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.fill = fill;
        this.ctx = context;
    }

    setPosition(x,y){
        this.posX = x;
        this.posY = y;
    }

    getPosition(){
        return {
            x: this.posX,
            y: this.posY
        }
    }

    draw(){
        this.ctx.fillStyle = 'red'; 
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.closePath();
    }
    
    isPositionInside(x, y){
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

}