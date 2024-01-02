import { consoleApp } from "../consoleApp";
import { Garden } from "./garden";


consoleApp (input => {
    console.log ( "take a possible walk in the garden with 64 steps");

    let garden = new Garden ( input );
    console.log ( "I could reach " + garden.getNumberOfReachablePots ( 64) + " different pots!");
    

    console.log ( "lets see, where a really long walk will can take us");
    console.log ( "I could reach " + garden.getNumberOfReachablePots ( 26501365 ) + " different pots!");
})