package graphTest;

import graph.Edge;
import graph.Graph;
import graph.Node;
import org.junit.Assert;
import org.junit.Test;

/**
 *
 * @author Djonathan
 */
public class GraphTest
{

    /**
     * Create an undirected graph with 2 edges: N1 -> N2 and N3 -> N1.
     * Adjacent count of N1 has to be equals 2.
     */
    @Test
    public void testUndirectedGraph()
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
        
        int nodeCount = n1.getAdjacentNodes(g).size();
        Assert.assertTrue(nodeCount == 2);
    }
    
   
    /**
     * Create a directed graph with 2 edges: N1 -> N2 and N3 -> N1.
     * Adjacent count of N1 has to be equals 1.
     */
    @Test
    public void testDirectedGraph()
    {
        Graph g = new Graph(true);

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
        
        int nodeCount = n1.getAdjacentNodes(g).size();
        Assert.assertTrue(nodeCount == 1);
    }
}


/**
 *  @Test
    public void testEstabDAO()
    {
        setDevDB();
        
        EstabelecimentoDAO dao = new EstabelecimentoDAO();

        Estabelecimento estab = dao.getEstabelecimentoByID(100);

        // Verifica se o DAO retournou algo
        Assert.assertTrue(estab != null);
    }
 */
