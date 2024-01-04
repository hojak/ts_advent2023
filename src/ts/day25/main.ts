import { consoleApp } from "../consoleApp";
import { Graph } from "./graph";


consoleApp (input => {
    console.log ( "searching for a possible split");

    let graph = new Graph(input);

    console.log ( "number of nodes: " + graph.numberOfNodes );
    console.log ( "number of edges: " + graph.numberOfEdges );
    console.log ( "number of possible edge removals: " + graph.numberOfEdges * ( graph.numberOfEdges-1) * (graph.numberOfEdges-2));

    let result = graph.findPartitioningByRemovingEdges();

    console.log ( "found partion: " + result);
    console.log ( "result: " + (result[0]*result[1]));
})
