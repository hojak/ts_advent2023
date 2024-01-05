export class GraphNode {
    private _name: string;
    private _edges: Set<Edge> = new Set();
    
    constructor ( name: string ) {
        this._name = name;
    }

    addEdge(thatNode: GraphNode, weight: number = 1) {
        this._edges.add ({ 
            node: thatNode, weight: weight
        });
    }
    removeEdge(thatNode: GraphNode) {
        for ( let edge of this._edges) {
            if ( edge.node.name == thatNode.name) {
                this._edges.delete ( edge );
            }
        }
    }

    public get connectedNodes(): GraphNode[] {
        return Array.from(this._edges.values()).map(edge => edge.node);
    }
    public get name(): string {
        return this._name;
    }
}

interface Edge {
    node: GraphNode,
    weight: number
}