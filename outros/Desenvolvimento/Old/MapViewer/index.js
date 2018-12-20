let me, graph, bot;

let positions = {
    x: [50, 50, 50, 50, 50, 100, 100, 100, 100, 100],
    y: [50, 100, 150, 200, 250, 50, 100, 150, 200, 250]
}

function setup() {
    createCanvas(800, 600);

    graph = new Graph();
    n1 = new Node("n1", 25, positions.x[0], positions.y[0]);
    n2 = new Node("n2", 25, positions.x[1], positions.y[1]);
    n3 = new Node("n3", 25, positions.x[2], positions.y[2]);
    n4 = new Node("n4", 25, positions.x[3], positions.y[3]);
    n5 = new Node("n5", 25, positions.x[4], positions.y[4]);
    n6 = new Node("n6", 25, positions.x[5], positions.y[5]);
    n7 = new Node("n7", 25, positions.x[6], positions.y[6]);
    n8 = new Node("n8", 25, positions.x[7], positions.y[7]);
    n9 = new Node("n9", 25, positions.x[8], positions.y[8]);
    n10 = new Node("n10", 25, positions.x[9], positions.y[9]);

    n1.connect(n2, new Edge("e1", 50));
    n2.connect(n3, new Edge("e2", 50));
    n3.connect(n4, new Edge("e3", 50));
    n3.connect(n8, new Edge("e10", 50));
    n4.connect(n5, new Edge("e4", 50));
    n5.connect(n10, new Edge("e5", 50));
    n6.connect(n7, new Edge("e6", 50));
    n7.connect(n8, new Edge("e7", 50));
    n8.connect(n9, new Edge("e8", 50));
    n9.connect(n10, new Edge("e9", 50));

    graph.addNode(n1);
    graph.addNode(n2);
    graph.addNode(n3);
    graph.addNode(n4);
    graph.addNode(n5);
    graph.addNode(n6);
    graph.addNode(n7);
    graph.addNode(n8);
    graph.addNode(n9);
    graph.addNode(n10);

    bot = new Bot(n1, 10);
    

}

function draw() {
    background(250);

    graph.show();
    bot.show();
}

