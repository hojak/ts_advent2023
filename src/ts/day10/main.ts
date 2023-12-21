import { consoleApp } from "../consoleApp";
import { PipeMap } from "./pipeMap";

consoleApp (input => {
    const pipeMap = new PipeMap(input);

    console.log ( "getting distance in the loop: ");
    console.log ( pipeMap.getMaximalDistance());

    console.log ( "Number of Inner Tiles");
    console.log ( pipeMap.countNumberOfSurroundedTiles() );
})