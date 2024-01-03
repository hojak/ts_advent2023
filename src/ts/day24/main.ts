import { consoleApp } from "../consoleApp";
import { getNumberOfCriticalCrossing } from "./line";
import { Vector } from "./vector";

consoleApp (input => {
    console.log ( "checking critical crossings")
    console.log ( getNumberOfCriticalCrossing ( 
        input, 
        new Vector (200000000000000, 200000000000000, 0), 
        new Vector (400000000000000, 400000000000000, 0) )
    );
});