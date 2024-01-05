import { GraphNode } from "./graphNode";

export class Graph {
    private _nodes: Map<string, GraphNode> = new Map();

    constructor ( description: string ) {
        description.split("\n")
            .map( line => line.trim()).filter ( line => line != "")
            .forEach (line => this.addLine ( line ))
    }

    public get numberOfNodes(): number {
        return this._nodes.size;
    }

    public get numberOfEdges(): number {
        return this.getListOfEdgeDescriptions().length;
    }

    public get nodeNames(): string[] {
        return Array.from(this._nodes.values()).map( node => node.name ).sort();
    }

    getWeightOfEdge(node1: string, node2: string): number | undefined  {
        return this._nodes.get(node1)?.getWeightOfEdgeTo(node2);
    }

    addLine(line: string): void {
        let split = line.split(":");
        let leftNodeName = split[0].trim();
        
        for ( let nodeName of split[1].trim().split(/ +/)) {
            this.addEdgeBetweenNodeNames ( leftNodeName, nodeName );
        }
    }

    addEdge(leftNode: GraphNode, rightNode: GraphNode) {
        leftNode.addEdge ( rightNode );
        rightNode.addEdge ( leftNode );
    }

    addEdgeBetweenNodeNames ( leftNodeName: string, rightNodeName: string ) {
        this.addEdge( this.getOrCreateNode(leftNodeName), this.getOrCreateNode(rightNodeName));
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

    getListOfEdgeDescriptions(): string[] {
        let result: string[] = [];
        for ( let node of this._nodes.values() ) {
            for ( let connectedTo of node.connectedNodes) {
                if ( node.name < connectedTo.name) {
                    result.push ( node.name + "," + connectedTo.name);
                }
            }
        }
        return result.sort();
    }


    findPartitioningByRemovingEdges(): number[] {
        let edges = this.getListOfEdgeDescriptions();
        let sizeOfGraph = this._nodes.size;

        let counter = 0;

        for ( let index1 = 0; index1 < edges.length-2; index1++) {
            let [node11, node12] = edges[index1].split(",");
            this.removeEdge ( node11, node12);
            for ( let index2 = index1+1; index2 < edges.length-1; index2++) {
                let [node21, node22] = edges[index2].split(",");
                this.removeEdge ( node21, node22);
                for ( let index3 = index2+1; index3 < edges.length; index3++) {
                    counter ++;
                    if ( counter % 1000 == 0) {
                        console.log ( new Date() + ": number of checked edge combinations: " + counter)
                    }

                    let [node31, node32] = edges[index3].split(",");
                    this.removeEdge ( node31, node32);

                    let sizeOfPartition = this.getPartitionSize(this._nodes.keys().next().value );
                    if ( sizeOfPartition < sizeOfGraph ) {
                        return [sizeOfPartition, sizeOfGraph-sizeOfPartition].sort();
                    }
                    this.addEdgeBetweenNodeNames(node31, node32);                    
                }
                this.addEdgeBetweenNodeNames(node21, node22);
            }
            this.addEdgeBetweenNodeNames(node11, node12);
        }

        return [0, this._nodes.size];
    }

    removeEdge(nodeName1: string, nodeName2: string) {
        let node1 = this._nodes.get(nodeName1);
        let node2 = this._nodes.get(nodeName2);

        if  ( node1 == undefined || node2 == undefined ) {
            return;
        }

        node1.removeEdge(node2);
        node2.removeEdge(node1);
    }


    mergeNodesByName(nodeName1: string, nodeName2: string) {
        const node1 = this._nodes.get(nodeName1);
        const node2 = this._nodes.get(nodeName2);
        if ( node1==undefined ||node2 == undefined) {
            return;
        }

        this.mergeNodes(node1, node2);
    }

    mergeNodes ( node1: GraphNode, node2: GraphNode) {
        let newNode = new GraphNode( [node1.name,node2.name].sort().join(","));

        for ( let edgeOfNode1 of node1.edges) {
            newNode.addEdge(edgeOfNode1.node, edgeOfNode1.weight);
            edgeOfNode1.node.removeEdge( node1);
            edgeOfNode1.node.addEdge(newNode, edgeOfNode1.weight);
        }

        for ( let edgeOfNode2 of node2.edges ) {
            newNode.addWeightOrEdge ( edgeOfNode2.node, edgeOfNode2.weight);
            edgeOfNode2.node.removeEdge(node2);
            edgeOfNode2.node.addWeightOrEdge( newNode, edgeOfNode2.weight);
        }

        this._nodes.delete(node1.name);
        this._nodes.delete(node2.name);
        this._nodes.set ( newNode.name, newNode);
    }


}