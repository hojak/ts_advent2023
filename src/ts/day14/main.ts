import { consoleApp } from "../consoleApp";
import { Platform } from "./Platform";

consoleApp (input => {
    console.log ( "getting weight of tilted platform ");
    console.log ( new Platform(input).tilt().getTotalLoad () );

    console.log ( "ok, let's do the billion!");

    let found : Map<string, number> = new Map(); 
    let numbers : Map<number, number> = new Map();

    let platform = new Platform(input);
    for ( let i=0; i<1000000000; i++ ) {
        if ( i % 1000000 == 0) {
            console.log ( new Date() + ": We're at " + Intl.NumberFormat('de-de').format ( i));
        }
        platform.cycle();
        
        let str = platform.toString();
        if ( found.has ( str )) {
            console.log ( new Date() + ": found cycle at iteration " + i);
            let cycleOffset = found.get(str) ?? 0;
            let cycleLength = i-cycleOffset;

            let targetIteration =  cycleOffset + (1000000000 - i -1) % cycleLength;
            let result = numbers.get(targetIteration) ?? -1;
            
            console.log ( "result: " + result );
            return;
        } else {
            found.set(str, i);
            numbers.set(i, platform.getTotalLoad());
        }
    }
    console.log ( "resulting load: " + platform.getTotalLoad());
    console.log ( platform.toString() );
})