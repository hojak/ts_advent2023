import { consoleApp } from "../consoleApp";
import { Universe } from "./universe";

consoleApp (input => {
    const universe = new Universe(input);

    console.log ( "analyze univers: ");
    console.log ( universe.getSumOfDistances());

})