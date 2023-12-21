import { consoleApp } from "../consoleApp";
import { PipeMap } from "./pipeMap";

consoleApp (input => {
    console.log ( "getting distance in the loop: ");
    console.log ( new PipeMap(input).getMaximalDistance());
})