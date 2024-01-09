import { consoleApp } from "../consoleApp"
import { transformPlan } from "./transformPlan";
import { DigTrail, getPlanBoundaries } from "./digTrail";

consoleApp (input => {
    console.log ( "let's start digging");
    let trail = new DigTrail ( input );
    console.log ( trail.getSizeOfHole() );

    console.log ( "decode plan");
    let decoded = transformPlan(input);

    console.log ( "get boundaries");
    console.log (getPlanBoundaries(decoded));
    
    trail = new DigTrail ( decoded );
    console.log ( trail.getSizeOfHole());
})