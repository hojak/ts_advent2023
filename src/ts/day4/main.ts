import { Card } from "./card";

export function rateCards ( input : string ) {
    return input.split("\n").filter ( line => line != "")
        .map(line => new Card ( line ))
        .map(card => card.rate())
        .reduce((prev, curr, index) => prev+curr);
}


let input = '';

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on ('data', function (part) {
    input += part
})

process.stdin.on ('end', function () {
    console.log ( "compute rating of al cards:");
    console.log ( rateCards( input ) );
})