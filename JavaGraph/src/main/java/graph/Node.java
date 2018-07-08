package graph;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 *
 * @author Djonathan
 */
public class Node
{
    private final UUID nodeID;
    private String status, description;
    private List<Node> adjacentNodes;
    private List<Edge> nodeEdges;
    
    /**
     * Node contructor. Will set a UUID to Node.
     * @param description String.
     */
    public Node(String description)
    {
        this.nodeID = UUID.randomUUID();
        this.description = description;
        this.adjacentNodes = new ArrayList();
        this.nodeEdges = new ArrayList();
    }
    
    /**
     * Get adjacent nodes of specific node.
     * @param g Graph.
     * @return List of Nodes that are adjacent of this one.
     */
    public List<Node> getAdjacentNodes(Graph g)
    {
        // For each edge in the node edges list
        for(Edge edge : nodeEdges)
        {
            // If the origin node of this edge it's THIS NODE, add destination node to list
            if(edge.getOriginNode().equals(this))
                adjacentNodes.add(edge.getDestNode());
            // If destination node of actual edge it's THIS NODE and is not a directed graph
            // Add origin node to list
            else if(!g.isIsDirected() && edge.getDestNode().equals(this))
                adjacentNodes.add(edge.getOriginNode());
        }
        
        return adjacentNodes;
    }
    
    /*
    * Default gets and sets.
    */
    public UUID getNodeID()
    {
        return this.nodeID;
    }
    
    public String getStatus()
    {
        return status;
    }

    public void setStatus(String status)
    {
        this.status = status;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public List<Edge> getNodeEdges()
    {
        return nodeEdges;
    }

    public void setNodeEdges(List<Edge> nodeEdges)
    {
        this.nodeEdges = nodeEdges;
    }
    
    
    
    
}
