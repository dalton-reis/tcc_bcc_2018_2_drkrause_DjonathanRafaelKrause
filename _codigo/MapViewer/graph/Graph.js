class Graph {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    addNode(node) {
        this.nodes.push(node);
        this.edges.push(node.edges);
    }

    addEdge(edge) {
        this.edges.push(edge);
    }

    show() {
        push();
        for(let node of this.nodes) {
            node.show();
        }
        pop();
    }

}


module.exports = Graph;