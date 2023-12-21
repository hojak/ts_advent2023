import { consoleApp } from "../consoleApp";
import { Network } from "./network";

consoleApp (input => {
    let network = new Network ( input );
    let startingNodes = network.getStartingNodes();

    console.log ( "found starting nodes: " + startingNodes);

    startingNodes.forEach ( node => {
        console.log ( "node: " + node );
        console.log ( network.findLoopStartingWithSoureNode(node));
    })
    
    console.log ("comupting first number of steps reaching an end position:");
    console.log ( network.solveSimultaneousStepsFor1EndPositionPerLoop() );
})