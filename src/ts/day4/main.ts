import { Card } from "./card";

export function rateCards ( input : string ) {
    return input.split("\n").filter ( line => line != "")
        .map(line => new Card ( line ))
        .map(card => card.rate())
        .reduce((prev, curr, index) => prev+curr);
}