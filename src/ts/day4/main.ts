import { Card } from "./card";

export function rateCards ( input : string ) {
    return input.split("\n").filter ( line => line != "")
        .map(line => new Card ( line ))
        .map(card => card.rate())
        .reduce((prev, curr, index) => prev+curr);
}


export function getNumberOfCards( input: string ) {
    return 0;
}

consoleApp( (input: string) => {
    console.log ( "compute rating of al cards:");
    console.log ( rateCards( input ) );
})