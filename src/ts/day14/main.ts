import { consoleApp } from "../consoleApp";
import { Platform } from "./Platform";

consoleApp (input => {
    console.log ( "getting weight of tilted platform ");
    console.log ( new Platform(input).tilt().getTotalLoad () );

    console.log ( "ok, let's do the million!");

    let platform = new Platform(input);
    for ( let i=0; i<1000000; i++ ) {
        if ( i % 10000 == 0) {
            console.log ( "We're at " + Intl.NumberFormat('de-de').format ( i));
        }
        platform.cylce();
    }
    console.log ( "resulting load: " + platform.getTotalLoad());
})