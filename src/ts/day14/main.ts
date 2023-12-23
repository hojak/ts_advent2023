import { consoleApp } from "../consoleApp";
import { Platform } from "./Platform";

consoleApp (input => {
    console.log ( "getting weight of tilted platform ");
    console.log ( new Platform(input).tilt().getTotalLoad () );
})