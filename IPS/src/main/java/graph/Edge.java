package graph;

import java.util.UUID;

/**
 *
 * @author Djonathan
 */
public class Edge
{
    private final UUID edgeID;
    private String description;
    private Node originNode, destNode;
    
    public Edge(String description, Node originNode, Node destNode)
    {
        this.edgeID = UUID.randomUUID();
        this.description = description;
        this.originNode = originNode;
        this.destNode = destNode;
    }
   
    
    
   /*
    * Default gets and sets.
    */
    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public Node getOriginNode()
    {
        return originNode;
    }

    public void setOriginNode(Node originNode)
    {
        this.originNode = originNode;
    }

    public Node getDestNode()
    {
        return destNode;
    }

    public void setDestNode(Node destNode)
    {
        this.destNode = destNode;
    }

    public UUID getEdgeID()
    {
        return edgeID;
    }
    
    
    
}
