class Node {
    constructor(id, r, x, y) {
        this.r = r;
        this.id = id;
        this.adjs = [];
        this.edges = [];
        this.color = color(255, 100, 100);
        this.pos = createVector(x, y);
    }

    connect(destNode, edge) {
        this.adjs.push(destNode);
        this.edges.push(edge);
    }

    show() {
        push();
        ellipse(this.pos.x, this.pos.y, this.r, this.r);

        stroke(10);
        for(let node of this.adjs) {
            line(this.pos.x, this.pos.y, node.pos.x, node.pos.y);
        }
        pop();
    }
}