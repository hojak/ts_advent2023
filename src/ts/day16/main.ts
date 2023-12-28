import { consoleApp } from "../consoleApp";
import { Contraption } from "./contraption";

consoleApp (input => {
    console.log ( "computing number of energized tile");
    console.log ( new Contraption(input).numberOfEnergizedTiles());

    console.log ( "find best possible energization");
    console.log ( new Contraption(input).findBestEnergization());

})