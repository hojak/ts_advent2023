import { consoleApp } from "../consoleApp";
import { Network } from "./network";

consoleApp (input => {
    console.log ( "count the number of simultaneous steps from XXA to YYZ");
    console.log ( new Network(input).getNumberOfNecessarySimultaneousSteps());
})