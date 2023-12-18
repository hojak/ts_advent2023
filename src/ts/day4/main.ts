import { Card } from "./card";
import { consoleApp } from "../consoleApp";

export function rateCards ( input : string ) {
    return input.split("\n").filter ( line => line != "")
        .map(line => new Card ( line ))
        .map(card => card.getRating())
        .reduce((prev, curr, index) => prev+curr);
}


export function getNumberOfCards( input: string ) {
    return 0;
}

consoleApp( (input: string) => {
    console.log ( "compute rating of al cards:");
    console.log ( rateCards( input ) );
})