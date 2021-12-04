class Pellet {
    constructor(_position, _vector) {
        this.position = _position;
        this.lastPos = createVector();
        this.direction = createVector(mouseX - this.position.x, mouseY - this.position.y)
        this.speed = 4;
        this.length = 10;
        this.explode = false;
        this.explodeCounter = 0;
        this.color = color(random(255),random(255),random(255))
    }

    calcDirection() {
        this.direction.setMag(this.speed);
    }

    update() {
        if(this.explode == true){
            this.speed = 0;
            this.position = this.newPos;
        }
        this.position.x += this.direction.x * this.speed;
        this.position.y += this.direction.y * this.speed;
    }

    collide(colliders) {
        for (let collider of colliders) {
            let corners = collider.corners;
            let dX = this.direction.x;
            let dY = this.direction.y;
            let inVert, inHoriz;

            if (this.position.x > corners.x1 && this.position.x < corners.x2) {
                //IN X BOUNDS
                inVert = true;

                if (this.position.y > corners.y1 && this.position.y < corners.y4) {
                    //IN X AND Y BOUNDS
                    inHoriz = true;
                    if (!this.explode) {
                        this.explode = true;
                        collider.hit = true;
                        this.newPos = closestRectPoint(this.position,collider.corners)
                        ellipse(this.newPos.x, this.newPos.y, 20)

                    }
                }
            }


        }
    }

    draw() {
        noStroke();
        // fill("#0F8B8D")
        fill(this.color)
        if (this.explode == true) {
            // fill(200)
            fill(this.color)
            ellipse(this.position.x, this.position.y, 8, 8)
        } else if(!this.explode){
            ellipse(this.position.x, this.position.y, 10, 10)
        }
    }

}