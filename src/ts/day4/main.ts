import { Card } from "./card";
import { consoleApp } from "../consoleApp";

export function rateCards ( input : string ) {
    return input.split("\n").filter ( line => line != "")
        .map(line => new Card ( line ))
        .map(card => card.getRating())
        .reduce((prev, curr, index) => prev+curr);
}


export function getNumberOfCards( input: string ) : number{
    let cards = input.split("\n").filter(line => line != "")
        .map ( line => new Card (line));

    let numberOfCards: number[] = new Array (cards.length);
    for ( let index=0; index < numberOfCards.length; index ++) {
        numberOfCards[index] = 1;
    }

    for ( let cardNumber = 0; cardNumber<cards.length; cardNumber++) {
        let numberOfMatches = cards[cardNumber].getNumberOfMatches ();

        for ( let updateNumber = cardNumber+1; updateNumber<(cardNumber+1+numberOfMatches) && updateNumber<cards.length; updateNumber++) {
            numberOfCards[updateNumber] += numberOfCards[cardNumber];
        }
    }

    return numberOfCards.reduce( (prev, curr, index) => prev+curr);
}

consoleApp( (input: string) => {
    console.log ( "compute rating of al cards:");
    console.log ( rateCards( input ) );
    console.log ( "compute number of scratchcards:");
    console.log ( getNumberOfCards( input ) );
})
