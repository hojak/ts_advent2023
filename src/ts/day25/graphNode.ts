export class GraphNode {
    private _name: string;
    private _edges: Set<Edge> = new Set();
    private _nodeWeights : Map<string,number> = new Map();
    
    constructor ( name: string ) {
        this._name = name;
    }

    addEdge(thatNode: GraphNode, weight: number = 1) {
        this._edges.add ({ 
            node: thatNode, weight: weight
        });
        this._nodeWeights.set (thatNode.name, weight );
    }

    removeEdge(thatNode: GraphNode) {
        for ( let edge of this._edges) {
            if ( edge.node.name == thatNode.name) {
                this._edges.delete ( edge );
            }
        }
        this._nodeWeights.delete(thatNode.name);
    }

    addWeightOrEdge(thatNode: GraphNode, weight: number) {
        for ( let edge of this._edges) {
            if ( edge.node.name == thatNode.name) {
                edge.weight += weight;
                this._nodeWeights.set(thatNode.name, edge.weight);
                return;
            }
        }
        this.addEdge(thatNode, weight);
    }

    public get connectedNodes(): GraphNode[] {
        return Array.from(this._edges.values()).map(edge => edge.node);
    }
    public get name(): string {
        return this._name;
    }
    public get edges(): Edge[] {
        return Array.from(this._edges);
    }

    public getWeightOfEdgeTo( thatNode: string ) : number|undefined {
        return this._nodeWeights.get(thatNode);
    }

    public toString() : string {
        return this._name + ": " + Array.from(this._edges).map( edge => edge.node.name + "(" + edge.weight + ")").join (" ");
    }

    toStringWithReducedEdges(): string {
        return this._name + ": " + 
            Array.from(this._edges)
                .filter ( edge => edge.node.name > this.name )
                .sort ( (edge1, edge2) => edge1.node.name.localeCompare(edge2.node.name))
                .map( edge => edge.node.name + "(" + edge.weight + ")")
                .join (" ");
    }
}

interface Edge {
    node: GraphNode,
    weight: number
}