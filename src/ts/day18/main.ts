import { consoleApp } from "../consoleApp"
import { GroundPlan, getPlanBoundaries } from "./groundPlan";
import { transformPlan } from "./transformPlan";
import { DigTrail } from "./digTrail";

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