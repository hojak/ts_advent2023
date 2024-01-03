import { consoleApp } from "../consoleApp";
import { HikingMap, lengthOfWalk } from "./hikingMap";

consoleApp (input => {
    console.log ( "taking a walk");

    let map = new HikingMap(input);

    console.log ( "This is the longest hike:")
    let hike = map.getLongestWalk();

    console.log(hike);
    console.log( lengthOfWalk ( hike ));

    console.log ( "Now walking up slopes:")
    map = map.removeSlopes();
    hike = map.getLongestWalk();

    console.log ( "This is now the longest hike:")
    console.log(hike);
    console.log( lengthOfWalk ( hike ));
    
})
