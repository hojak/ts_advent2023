export class Graph {
    private _nodes: string[] = [];
    private _matrix: boolean[][] = [];

    constructor ( description: string ) {
        this._initializeNodes(description);
        this._initializeMatrix(description);
    }

    private _initializeMatrix(description: string) {
        for ( let i=0; i < this._nodes.length; i ++) {
            this._matrix[i] = [];
            for ( let j=0; j < this._nodes.length; j ++) {
                this._matrix[i][j] = false;
            }
        }

        for ( let line of description.split("\n")) {
            let [name, connectedNodes] = line.split(":");

            for ( let node of connectedNodes.trim().split(/ +/)) {
                this.addEdgeBetweenNodeNames(name, node);
            }
        }
    }
    
    private _initializeNodes(description: string) {
        let setOfNodeNames : Set<string> = new Set();
        for ( let line of description.split("\n")) {
            let [name, connectedNodes] = line.split(":");
            setOfNodeNames.add ( name.trim() );

            for ( let node of connectedNodes.trim().split(/ +/)) {
                setOfNodeNames.add ( node.trim());
            }
        }
        this._nodes = Array.from(setOfNodeNames.values()).sort();
    }

    public get numberOfNodes(): number {
        return this._nodes.length;
    }

    public get numberOfEdges(): number {
        return this.getListOfEdges().length;
    }

    addEdgeBetweenNodeNames ( leftNodeName: string, rightNodeName: string ) {
        let index1 = this.findIndexForNodeName(leftNodeName);
        let index2 = this.findIndexForNodeName(rightNodeName);

        this.addEdgeBetweenNodeIds(index1, index2);
    }

    private addEdgeBetweenNodeIds(index1: number, index2: number) {
        this._matrix[index1][index2] = true;
        this._matrix[index2][index1] = true;
    }

    private findIndexForNodeName(name: string) {
        return this._nodes.findIndex(element => element == name);
    }

    getPartitionSize(nodeIndex: number): number {
        if ( nodeIndex == undefined ) {
            return 0;
        }

        let reachableNodes : Set<number> = new Set ();
        let queue = [nodeIndex];
        while ( queue.length > 0 ) {
            let nodeIndex = queue.pop();
            if ( nodeIndex == undefined ) {
                continue;
            }

            reachableNodes.add(nodeIndex);
            for ( let connectedNode of this.getConnectedNodes(nodeIndex) ) {
                if ( ! reachableNodes.has(connectedNode)) {
                    queue.push( connectedNode );
                }
            }
        }

        return reachableNodes.size;
    }

    getConnectedNodes(nodeIndex: number) {
        let result: number[] = []
        for ( let i=0; i<this._matrix.length; i++) {
            if ( this._matrix[nodeIndex][i]) {
                result.push(i);
            }
        }
        return result;
    }


    getListOfEdges(): number[][] {
        let result: number[][] = [];
        for ( let node1=0; node1<this._matrix.length-1; node1++ ) {
            for ( let node2= node1+1; node2<this._matrix.length; node2++) {
                if ( this.edgeExists(node1, node2)) {
                    result.push ( [node1, node2] );
                }
            }
        }
        return result;
    }

    edgeExists(node1: number, node2: number) {
        return this._matrix[node1][node2];
    }


    findPartitioningByRemovingEdges(): number[] {
        let edges = this.getListOfEdges();

        let counter = 0;

        for ( let index1 = 0; index1 < edges.length-2; index1++) {
            let [node11, node12] = edges[index1];
            this.removeEdgeById ( node11, node12);
            for ( let index2 = index1+1; index2 < edges.length-1; index2++) {
                let [node21, node22] = edges[index2]
                this.removeEdgeById ( node21, node22);
                for ( let index3 = index2+1; index3 < edges.length; index3++) {
                    counter ++;
                    if ( counter % 1000 == 0) {
                        console.log ( new Date() + ": number of checked edge combinations: " + counter)
                    }

                    let [node31, node32] = edges[index3]
                    this.removeEdgeById ( node31, node32);

                    let sizeOfPartition = this.getPartitionSize(0);
                    if ( sizeOfPartition < this._nodes.length ) {
                        return [sizeOfPartition, this._nodes.length-sizeOfPartition].sort();
                    }
                    this.addEdgeBetweenNodeIds(node31, node32);                    
                }
                this.addEdgeBetweenNodeIds(node21, node22);
            }
            this.addEdgeBetweenNodeIds(Number(node11), Number(node12));
        }

        return [0, this._nodes.length];
    }

    removeEdgeById(nodeId1: number, nodeId2: number) {
        this._matrix[nodeId1][nodeId2] = false;
        this._matrix[nodeId2][nodeId1] = false;
    }

    removeEdge(nodeName1: string, nodeName2: string) {
        let nodeId1 = this.findIndexForNodeName(nodeName1);
        let nodeId2 = this.findIndexForNodeName(nodeName2);
        this.removeEdgeById(nodeId1, nodeId2);
    }


}