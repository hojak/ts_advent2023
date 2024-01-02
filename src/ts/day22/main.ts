import { consoleApp } from "../consoleApp";
import { PileOfBricks } from "./pileOfBricks";


consoleApp (input => {
    console.log ( "check for desintegratable bricks");

    let pile = new PileOfBricks();
    pile.initializeFromSnapshot(input);

    console.log ( pile.getNumberOfRemovableBricks()  + " bricks can be desintegrated");

    console.log ( "total number of bricks: " + pile.bricks.length);
    console.log ( "total number of occupied spaces: " + pile.numberOfOccupiedSpaces() );
})