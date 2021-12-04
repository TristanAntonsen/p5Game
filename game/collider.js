class Collider {
    constructor(_x, _y, _width, _height,_rad,_r,_g,_b) {
        this.R = _r;
        this.G = _g;
        this.B = _b;
        this.width = _width;
        this.height = _height;
        this.rad = _rad;
        this.position = createVector(_x, _y);
        this.center = createVector(_x + this.width / 2, _y + this.height / 2)
        this.top = this.center.y - this.height / 2;
        this.corners = {
            x1: this.position.x,
            y1: this.position.y,
            x2: this.position.x + this.width,
            y2: this.position.y,
            x3: this.position.x + this.width,
            y3: this.position.y + this.height,
            x4: this.position.x,
            y4: this.position.y + this.height
        }
        this.hit = false;
    }

    draw() {
        this.position.y -sin(10*this.sinCounter);
        rectMode(CORNER)
        if(this.hit == true){
            fill(color(100))
        } else {
            fill(color(this.R,this.G,this.B))
        }
        rect(this.position.x, this.position.y, this.width, this.height,this.rad)
    }
}