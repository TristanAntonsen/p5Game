class Player {

    constructor(_x, _y, _color) {
        this.position = createVector(_x, _y)
        this.netForce = createVector();
        this.height = 40;
        this.width = 15;
        this.inBounds = true;
        this.playerColor = _color;

        this.jumping = false;
        this.moveR = false;
        this.moveL = false;
        this.inCollider = false;
        this.canJump = true;
        this.facing = 1;
        this.lastPos = createVector()
        this.ySpeed = 0;
        this.sneak = false;


    }


    edges() {
        if (this.position.x > width - this.width) {
            this.position.x = width - this.width;
        } else if (this.position.x < this.width) {
            this.position.x = this.width;
        }
        if (this.position.y > height) {
            this.position.y = height;
        } else if (this.position.y < this.width + 2) {
            this.position.y = this.width + 2;
        }
    }


    checkKeys() {
        if (keyIsDown(37) | keyIsDown(65)) {
            this.moveL = true;
        } else {
            this.moveL = false;
        }
        if (keyIsDown(39) | keyIsDown(68)) {
            this.moveR = true;
        } else {
            this.moveR = false;
        }

        if (keyIsDown(16)) {
            this.sneak = true;
        } else {
            this.sneak = false;
        }
    }

    sumAllForces() {
        // let forces = createVector();
        //Gravity
        if (!this.inCollider) {
            this.netForce.y += gravity;
            this.moveForce = 0;

        } else {
            this.netForce.y = 0;
        }
        //Jumping
        if (keyIsDown(32) | keyIsDown(38) | keyIsDown(87)) {
            if (this.canJump) {
                if (this.sneak) {
                    this.netForce.y -= jumpForce / 2;
                    this.canJump = false;
                } else {
                    this.netForce.y -= jumpForce;
                    this.canJump = false;
                }
            }
        }

        //Left and right keys
        if (this.moveR == true) {
            this.netForce.x += moveForce * acceleration;
            //LOOK RIGHT
            this.facing = 1;
        }

        if (this.moveL == true) {
            this.netForce.x -= moveForce * acceleration;
            //LOOK LEFT
            this.facing = -1;
        }

        if (this.netForce.x > moveForce) {
            this.netForce.x = moveForce;
        } else if (this.netForce.x < -moveForce) {
            this.netForce.x = -moveForce;
        }

        if (!this.moveR && !this.moveL && this.inCollider) {
            if (this.netForce.x > 0) {
                this.netForce.x -= deceleration;
            } else if (this.netForce.x < 0) {
                this.netForce.x += deceleration;
            }

            if (Math.abs(this.netForce.x) < .1) {
                this.netForce.x = 0;
            }
        }
    }


    update() {
        //vf = v0 +at
        //vf += a*t
        //vf += a*1
        //vf += f/m
        //vf += f
        this.lastY = this.position.y;

        //MAIN UPDATE
        if (this.sneak) {
            this.netForce.x /= 2; //divide x force by 2, not sure if this is the best way to do it
            this.position.add(this.netForce);
        } else {
            this.position.add(this.netForce);
        }

        //Speed
        this.ySpeed = Math.abs(this.position.y - this.lastY) / 20;
    }

    draw() {
        let eyeOffset = 3;
        let eyeLX = this.position.x - this.width * .20 + eyeOffset * this.facing;
        let eyeRX = this.position.x + this.width * .20 + eyeOffset * this.facing;
        let eyeLY = this.position.y - this.width * 1.5 / 2 - this.width * (this.ySpeed / 2)
        let eyeRY = this.position.y - this.width * 1.5 / 2 - this.width * (this.ySpeed / 2)
        let eyeD = this.width / 2.5;
        fill(this.playerColor);
        noStroke();
        rectMode(CENTER)
        ellipse(this.position.x, this.position.y - this.width / 2 - 2, this.width * (1 - this.ySpeed / 3), this.width * (1 + this.ySpeed))
        fill(255)
        stroke(this.playerColor);
        strokeWeight(1);
        ellipse(eyeLX, eyeLY, eyeD)
        ellipse(eyeRX, eyeRY, eyeD)
        fill(255)
    }



    checkForCollision(colliders) {
        let x = this.position.x;
        let y = this.position.y;
        let floor = 500;
        let numCollisions = 0;
        let newPos = createVector();
        let dX, dY, hitCollider
        for (let collider of colliders) {
            let corners = collider.corners;
            if (x < corners.x3 && x > corners.x1) {
                // ABOVE OR BELOW BOX
                this.aboveCollider = true;
                if (y <= corners.y3 && y >= corners.y1) {
                    //INSIDE BOX
                    numCollisions += 1;
                    floor = collider.top;
                    dX = collider.center.x - this.position.x;
                    dY = collider.center.y - this.position.y;
                    hitCollider = collider

                } else {
                    this.inCollider = false;
                }
            } else {
                // NOT IN BOX
                this.inCollider = false;
                this.aboveCollider = false;
            }
        }

        fill(255)
        noStroke()

        if (numCollisions > 0) {

            newPos = closestRectPoint(this.position, hitCollider.corners);
            this.inCollider = true;
            floor = floor + 2;
            this.position.y = floor;
            this.canJump = true;
            hitCollider.hit = true;
        }

    }

}
