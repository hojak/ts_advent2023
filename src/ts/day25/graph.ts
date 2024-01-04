import { GraphNode } from "./graphNode";

export class Graph {
    private _nodes: Map<string, GraphNode> = new Map();

    constructor ( description: string ) {
        description.split("\n")
            .map( line => line.trim()).filter ( line => line != "")
            .forEach (line => this.addLine ( line ))
    }

    addLine(line: string): void {
        let split = line.split(":");
        let leftNode = this.getOrCreateNode ( split[0].trim() );
        
        for ( let nodeName of split[1].trim().split(/ +/)) {
            let rightNode = this.getOrCreateNode(nodeName);

            this.addEdge ( leftNode, rightNode );
        }
    }

    addEdge(leftNode: GraphNode, rightNode: GraphNode) {
        leftNode.addEdge ( rightNode );
        rightNode.addEdge ( leftNode );
    }


    getOrCreateNode(name: string) : GraphNode {
        let result = this._nodes.get(name);
        if ( result == undefined ) {
            let newNode = new GraphNode(name);
            this._nodes.set ( name, newNode );
            return newNode;
        } else {
            return result;
        }
    }

    getPartitionSize(nodeName: string): number {
        let node = this._nodes.get(nodeName);
        if ( node == undefined ) {
            return 0;
        }

        let reachableNodes : Set<GraphNode> = new Set ();
        let queue = [node];
        while ( queue.length > 0 ) {
            node = queue.pop();
            if ( node == undefined ) {
                continue;
            }

            reachableNodes.add(node);
            for ( let connectedNode of node.connectedNodes ) {
                if ( ! reachableNodes.has(connectedNode)) {
                    queue.push( connectedNode );
                }
            }
        }

        return reachableNodes.size;
    }

}