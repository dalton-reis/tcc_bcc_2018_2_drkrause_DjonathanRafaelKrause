package drk.ips;

import graph.Edge;
import graph.Graph;
import graph.Node;

/**
 *
 * @author Djonathan
 */
public class Main
{
    public static void main(String[] args)
    {
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
    }
    
}
