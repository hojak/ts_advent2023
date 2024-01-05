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

    public get nodes() : GraphNode[] {
        return Array.from(this._nodes.values());
    }

    getWeightOfEdge(node1: string, node2: string): number | undefined  {
        return this._nodes.get(node1)?.getWeightOfEdgeTo(node2);
    }

    addLine(line: string): void {
        let split = line.split(":");
        let leftNodeName = split[0].trim();
        let weightMatcher = /^(.*)\(([0-9]+)\)$/;
        
        for ( let nodeName of split[1].trim().split(/ +/).filter( item => item !="")) {
            let weight = 1;
            let matchGroups = weightMatcher.exec(nodeName);
            if ( matchGroups != null ) {
                weight = Number ( matchGroups[2]);
                nodeName = matchGroups[1];
            }

            this.addEdgeBetweenNodeNames ( leftNodeName, nodeName, weight );
        }
    }

    addEdge(leftNode: GraphNode, rightNode: GraphNode, weight: number = 1) {
        leftNode.addEdge ( rightNode, weight );
        rightNode.addEdge ( leftNode, weight );
    }

    addEdgeBetweenNodeNames ( leftNodeName: string, rightNodeName: string, weight: number = 1 ) {
        this.addEdge( this.getOrCreateNode(leftNodeName), this.getOrCreateNode(rightNodeName), weight);
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
        if ( node1 == node2 ) {
            throw new Error ( "cannot merge a node with itself!");
        }

        let newNodeName = node1.name.split(",")
            .concat ( node2.name.split(",")).sort().join(",");

        let newNode = new GraphNode( newNodeName );

        for ( let edgeOfNode1 of node1.edges) {
            if ( edgeOfNode1.node != node2) {
                newNode.addEdge(edgeOfNode1.node, edgeOfNode1.weight);
                edgeOfNode1.node.removeEdge( node1);
                edgeOfNode1.node.addEdge(newNode, edgeOfNode1.weight);
            }
        }

        for ( let edgeOfNode2 of node2.edges ) {
            if ( edgeOfNode2.node != node1) {
                newNode.addWeightOrEdge ( edgeOfNode2.node, edgeOfNode2.weight);
                edgeOfNode2.node.removeEdge(node2);
                edgeOfNode2.node.addWeightOrEdge( newNode, edgeOfNode2.weight);
            }
        }

        this._nodes.delete(node1.name);
        this._nodes.delete(node2.name);
        this._nodes.set ( newNode.name, newNode);
    }



    stoerWagnerMinCut() : MinCutResult {
        return this.getCopyOfGraph()._destroyingStoerWagnerMinCut();
    }

    _destroyingStoerWagnerMinCut() : MinCutResult {
        console.log ( Array.from ( this._nodes.values() ));

        let minimalCutWeight = NaN;
        let currentMinimalCut = ["", ""];

        while ( this.numberOfNodes > 2 ) {
            let cutOfTheIteration = this.getCutOfTheIteration();

            if (isNaN(minimalCutWeight) || minimalCutWeight > cutOfTheIteration.weight) {
                minimalCutWeight = cutOfTheIteration.weight;
                currentMinimalCut = [
                    cutOfTheIteration.nodeS.name,
                    Array.from(this._nodes.values()).map(node => node.name).filter(name => name != cutOfTheIteration.nodeS.name).sort().join(",")
                ];
            }

            this.mergeNodes ( cutOfTheIteration.nodeS, cutOfTheIteration.nodeT);
        }

        currentMinimalCut = currentMinimalCut.sort();

        return {
            setA: currentMinimalCut[0].split(",").sort(),
            setB: currentMinimalCut[1].split(",").sort(),
            weight: minimalCutWeight
        };
    }

    getCopyOfGraph() : Graph {
        return new Graph( this.toString() );
    }

    toString (): string {
        return Array.from(this._nodes.values())
            .sort ( (node1, node2) => node1.name.localeCompare(node2.name))
            .map( node => node.toStringWithReducedEdges())
            .join("\n");
    }

    getCutOfTheIteration() : CutOfTheIteration{
        // alternatively select a random node instead of the first
        //let randomNodeIndex = Math.floor(Math.random() * nodes.length)

        let availableNodes = Array.from(this._nodes.values());       
        let selectedNodes : GraphNode[] = [availableNodes.shift() ?? new GraphNode("ERROR")];
        let latestAddedNode = selectedNodes[0];
        let maxKnownConnectionWeight = 0;

        while ( availableNodes.length > 1 ) {
            maxKnownConnectionWeight = 0;
            let nodeWithMaxConnectionToSelection : GraphNode = availableNodes[0];

            for ( let candidate of availableNodes.values()) {
                let connectionBetweenSelectedAndNode = this._getNodeConnectionWeight(candidate, selectedNodes);
                
                if ( connectionBetweenSelectedAndNode > maxKnownConnectionWeight) {
                    nodeWithMaxConnectionToSelection = candidate;
                    maxKnownConnectionWeight = connectionBetweenSelectedAndNode;
                }
            }

            selectedNodes.push( nodeWithMaxConnectionToSelection );
            availableNodes.splice( availableNodes.indexOf(nodeWithMaxConnectionToSelection), 1);
            latestAddedNode = nodeWithMaxConnectionToSelection;
        }

        let nodeS = availableNodes[0]; 

        return {
            nodeS: nodeS,
            nodeT: latestAddedNode,
            weight: this._getNodeConnectionWeight(nodeS, selectedNodes)
        }
    }

    _getNodeConnectionWeight(fromNode: GraphNode, toNodeArray: GraphNode[] ) {
        return toNodeArray
            .flatMap(node => node.edges)                        // get all edges of selected nodes
            .filter( edge => edge.node.name == fromNode.name)       // which hit the current _node_
            .reduce( (prev, curr) => prev + curr.weight, 0); 
    }

    selectSecondReduceNode(node1: GraphNode) : GraphNode {
        return node1.edges
            .reduce ( (prev, curr) => prev.weight < curr.weight ? curr : prev)
            .node;
    }


}



interface CutOfTheIteration {
    nodeS: GraphNode,
    nodeT: GraphNode,
    weight: number
}

interface MinCutResult {
    setA: string[],
    setB: string[],
    weight: number
}
