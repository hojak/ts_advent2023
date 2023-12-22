import { consoleApp } from "../consoleApp";
import { Universe } from "./universe";

consoleApp (input => {
    const universe = new Universe(input);

    console.log ( "find distances ");
    console.log ( "factor 2: " + universe.getSumOfDistances());
    universe.expansionFactor = 100;
    console.log ( "factor 100: " + universe.getSumOfDistances());
    universe.expansionFactor = 1000000;
    console.log ( "factor 1 000 000: " + universe.getSumOfDistances());

})