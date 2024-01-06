import { consoleApp } from "../consoleApp";
import { Garden } from "./garden";


consoleApp (input => {
    console.log ( "take a possible walk in the garden with 64 steps");

    let garden = new Garden ( input );
    console.log ( "I could reach " + garden.getNumberOfReachablePots ( 64) + " different pots!");
    
})