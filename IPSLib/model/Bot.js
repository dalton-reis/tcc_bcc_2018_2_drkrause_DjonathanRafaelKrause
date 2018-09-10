class Bot {
    constructor(node, r) {
        this.actualNode = node;
        this.r = r;
        this.history = [];
        this.history.push(node);
    }

    show() {
        push();
        noStroke();
        fill(255, 100, 100);
        ellipse(this.actualNode.pos.x, this.actualNode.pos.y, this.r);
        pop();
    }

    goto(node) {
        if(this.actualNode.adjs.includes(node)) {
            this.history.push(node);
            this.actualNode = node;
        } else {
            return 'Bot cannot reach the destination node';
        }
    }


}