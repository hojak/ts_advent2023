import { consoleApp } from "../consoleApp"
import { GroundPlan, getPlanBoundaries } from "./groundPlan";

consoleApp (input => {
    console.log ( "let's start digging");
    console.log ( new GroundPlan().digAsPlanned(input).digOutInterior().numberOfDiggedSquares() );

    console.log ( "get bpundaries");
    console.log ( getPlanBoundaries ( input));
})