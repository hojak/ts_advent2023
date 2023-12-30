import { consoleApp } from "../consoleApp"
import { GroundPlan } from "./groundPlan";

consoleApp (input => {
    console.log ( "let's start digging");
    console.log ( new GroundPlan().digAsPlanned(input).digOutInterior().numberOfDiggedSquares() );
})