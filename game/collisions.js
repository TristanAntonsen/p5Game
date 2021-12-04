
// https://editor.p5js.org/mcb419/sketches/B1z32zcjm
let dist2 = (v, w) => (v.x - w.x) * (v.x - w.x) + (v.y - w.y) * (v.y - w.y); //a^2 + b^2 => distance ^ 2

function closestLinePoint(p, v, w) {
    // return closest point to point p falling on line segment vw.
    let l2 = dist2(v, w);
    // console.log(l2)
    if (l2 == 0) return v;

    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;


    let xOut = v.x + t * (w.x - v.x)
    let yOut = v.y + t * (w.y - v.y)

    let d2 = dist(p.x, p.y, xOut, yOut)

    // v.d = 0;
    // w.d = 0;
    if (t < 0) {
        v.d = dist(p.x, p.y, v.x, v.y)
        return v;
    }; //dist2(p, v);
    if (t > 1) {
        w.d = dist(p.x, p.y, w.x, w.y)
        return w;
    }; //dist2(p, w);


    return { x: xOut, y: yOut, d: d2 }
}


function closestRectPoint(p, corners) {

    let t = [{x: corners.x1,y: corners.y1},{x: corners.x2,y: corners.y2}]
    let r = [{x: corners.x2,y: corners.y2},{x: corners.x3,y: corners.y3}]
    let b = [{x: corners.x3,y: corners.y3},{x: corners.x4,y: corners.y4}]
    let l = [{x: corners.x4,y: corners.y4},{x: corners.x1,y: corners.y1}]

    let edges = [t, r, b, l]

    let pts = [];

    for (let edge of edges) {
        let pt = closestLinePoint(p, edge[0], edge[1])
        pts.push(pt)

        let size = pt.d;

        noFill();
        stroke(255);
        strokeWeight(2)

    }

    pts.sort(function (a, b) {
        return a.d - b.d;
    })

    let closest = pts[0]


    noStroke()
    fill(255)
    // ellipse(closest.x, closest.y, 20)
    let outputPos = createVector(closest.x,closest.y)
    return outputPos

}

function PosAfterCollide(pos,collider){
    let offset = 10;
    let center = collider.center
    let c2p = p5.Vector.sub(pos,center)
    c2p.mult(1.1)
    center.add(c2p)
    return center 
}

function mousePressed() {
    noLoop()
}