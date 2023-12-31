import { consoleApp } from "../consoleApp"
import { GroundPlan, getPlanBoundaries } from "./groundPlan";
import { transformPlan } from "./transformPlan";

consoleApp (input => {
    console.log ( "let's start digging");
    const groundPlan = new GroundPlan().digAsPlanned(input);
    groundPlan.printBoundaries();
    console.log ( groundPlan.digOutInterior().numberOfDiggedSquares() );

    console.log ( "decode plan");
    let decoded = transformPlan(input);

    console.log ( "get boundaries");
    console.log ( getPlanBoundaries ( decoded));
    
    const groundPlanDecoded = new GroundPlan().digAsPlanned(decoded);
    groundPlanDecoded.printBoundaries();
    console.log ( groundPlanDecoded.digOutInterior().numberOfDiggedSquares() );
})