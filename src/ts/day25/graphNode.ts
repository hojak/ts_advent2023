import { nodeModuleNameResolver } from "typescript";

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

    addWeightOrEdge(thatNode: GraphNode, weight: number) {
        for ( let edge of this._edges) {
            if ( edge.node.name == thatNode.name) {
                edge.weight += weight;
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
        for ( let edge of this._edges) {
            if ( edge.node.name == thatNode) {
                return edge.weight;
            }
        }
        return undefined;
    }

    public toString() {
        return this._name + ": " + Array.from(this._edges).map( edge => edge.node.name + "(" + edge.weight + ")").join (",");
    }
}

interface Edge {
    node: GraphNode,
    weight: number
}