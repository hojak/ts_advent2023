import { consoleApp } from "../consoleApp";
import { checksum } from "./hash";
import { WallOfBoxes } from "./wallOfBoxes";

consoleApp (input => {
    console.log ( "computing checksum");
    console.log ( checksum(input));

    console.log ( "sum of lens power after initialization")
    console.log ( new WallOfBoxes( input ).evaluateInitialization());
})