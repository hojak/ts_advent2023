import { consoleApp } from "../consoleApp";
import { Graph } from "./graph";


consoleApp (input => {
    console.log ( "searching for a possible split");

    let graph = new Graph(input);

    console.log ( "number of nodes: " + graph.numberOfNodes );
    console.log ( "number of edges: " + graph.numberOfEdges );

    let result = graph.stoerWagnerMinCut();

    console.log ( "found partion: " );
    console.log ( result.setA  );
    console.log ( result.setB  );
    console.log ( "with weight " + result.weight );
    console.log ( "   -> puzzle result: " + (result.setA.length*result.setB.length));
})
