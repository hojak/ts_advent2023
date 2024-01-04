export class GraphNode {
    
    private _name: string;
    private _connectedTo: Set<GraphNode> = new Set();
    
    constructor ( name: string ) {
        this._name = name;
    }

    addEdge(thatNode: GraphNode) {
        this._connectedTo.add (thatNode);
    }

    public get connectedNodes(): Set<GraphNode> {
        return this._connectedTo;
    }

}