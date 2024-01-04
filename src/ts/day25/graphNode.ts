export class GraphNode {
    
    private _name: string;
    private _connectedTo: Set<GraphNode> = new Set();
    
    constructor ( name: string ) {
        this._name = name;
    }

    addEdge(thatNode: GraphNode) {
        this._connectedTo.add (thatNode);
    }
    removeEdge(thatNode: GraphNode) {
        this._connectedTo.delete(thatNode);
    }

    public get connectedNodes(): Set<GraphNode> {
        return this._connectedTo;
    }
    public get name(): string {
        return this._name;
    }

}