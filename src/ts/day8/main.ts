import { consoleApp } from "../consoleApp";
import { Network } from "./network";

consoleApp (input => {
    console.log ( "count the steps from AAA to ZZZ");
    console.log ( new Network(input).getNumberOfNecessarySteps());
})