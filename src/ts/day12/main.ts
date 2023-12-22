import { consoleApp } from "../consoleApp";
import { LineOfSprings } from "./lineOfSprings";

consoleApp (input => {
    let result = 0;
    console.log ("evaluate all lines: ")
    input.split ("\n").forEach( line => {
        let possibilities = new LineOfSprings(line).getNumberOfPossibleSolutions();
        console.log ( line + ": " + possibilities );
        result+= possibilities;
    })

    console.log ("\nover all: " + result );


    result = 0;
    console.log ("evaluate all lines unfolded: ")
    input.split ("\n").forEach( line => {
        const listOfSprings = new LineOfSprings(line);
        listOfSprings.unfold();
        let possibilities = listOfSprings.getNumberOfPossibleSolutions();
        console.log ( line + ": " + possibilities );
        result+= possibilities;
    })

    console.log ("\nover all: " + result );

})