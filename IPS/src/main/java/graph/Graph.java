package graph;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 *
 * @author Djonathan Krause
 */
public class Graph
{
    private final UUID graphID;
    private List<Node> nodes;
    private List<Edge> edges;
    private boolean isPlanar;
    private boolean isDirected;
    private int order;
    private int size;
    
    public Graph(boolean isDirected)
    {
        this.graphID = UUID.randomUUID();
        this.nodes = new ArrayList();
        this.edges = new ArrayList();
        this.isDirected = isDirected;
    }
    
    /**
     * Add an edge to Graph. Will increase by one the graph size.
     * @param edge - Edge to be added. 
     */
    public void addEdge(Edge edge)
    {
        // Add this edge to the NodeEdges list
        edge.getOriginNode().getNodeEdges().add(edge);
        
        // If itsn't a directed graph, add this edge also to the destination NodeEdges list
        if(!this.isDirected)
            edge.getDestNode().getNodeEdges().add(edge);
        
        // Add it to list
        this.edges.add(edge);
        
        // Increase graph size
        this.size++;
    }
    
    /**
     * Add a node to Graph. This will increase by one the graph order.
     * @param node - Node to be added.
     */
    public void addNode(Node node)
    {
        this.nodes.add(node);
        this.order++;
    }
    
   /*
    * Default gets and sets.
    */
    public List<Node> getNodes()
    {
        return nodes;
    }

    public List<Edge> getEdges()
    {
        return edges;
    }

    public boolean isIsPlanar()
    {
        return isPlanar;
    }

    public void setIsPlanar(boolean isPlanar)
    {
        this.isPlanar = isPlanar;
    }

    public boolean isIsDirected()
    {
        return isDirected;
    }

    public void setIsDirected(boolean isDirected)
    {
        this.isDirected = isDirected;
    }

    public int getOrder()
    {
        return order;
    }

    public void setOrder(int order)
    {
        this.order = order;
    }

    public int getSize()
    {
        return size;
    }

    public void setSize(int size)
    {
        this.size = size;
    }
    
    public UUID getGraphID()
    {
        return this.graphID;
    }
    
    
    
}
