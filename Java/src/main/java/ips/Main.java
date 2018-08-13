package ips;

import com.google.gson.Gson;
import java.io.File;
import java.io.IOException;
import static spark.Spark.*;

/**
 *
 * @author Djonathan
 */
public class Main {
    
    public static void main(String[] args) throws IOException {
        Map map = new Map();
        Gson gson = new Gson();

        File image1 = new File("C:\\Users\\djodr\\Documents\\IPS\\Utils\\QRs\\qr1_json.png");
        QR qrFromImage = gson.fromJson(QRCodeReader.readFromFile(image1), QR.class);
        
        map.addQR(qrFromImage);
        map.show();

        // Rest service
        get("/fromIonic/get/:data", (request, response) -> {
            try {
                map.addQR(gson.fromJson(request.params(":data"), QR.class));
                map.show();
                System.out.println("Get received: " + request.params(":data"));
                return "Get received from ionic: " + request.params(":data");
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return e.getMessage();
            }
        });

    }
}

/*
Graph g = new Graph(false);
        
Node n1 = new Node("N1");
Node n2 = new Node("N2");
Node n3 = new Node("N3");

Edge e1 = new Edge("N1 -> N2", n1, n2);
Edge e2 = new Edge("N3 -> N1", n3, n1);

g.addNode(n1);
g.addNode(n2);
g.addNode(n3);
g.addEdge(e1);
g.addEdge(e2);

System.out.println("\nEdges:");
for(Edge e : g.getEdges())
    System.out.println(e.getDescription());

System.out.println("\nNodes:");
for(Node n : g.getNodes())
    System.out.println(n.getDescription());

System.out.println("\nAdjacents to N1:");
    for(Node n : n1.getAdjacentNodes(g))
        System.out.println(n.getDescription());
 */
