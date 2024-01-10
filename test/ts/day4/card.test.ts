import { expect } from "chai";
import { Card } from "../../../src/ts/day4/card";

describe ( "Day 4: Card", () => {
    describe ("Constructor", () => {
        it ( "should create a card", () => {
            expect (new Card ("Card 1: 1 | 2")).not.to.be.null;
        })
    })

    describe ("rate card", () => {
        it ( "an empty card rates 0", () => { 
            expect ( new Card ( "Card 1: | ").getRating()).to.be.equal (0);
        });

        it ( "a simple match should rate to 1", () => { 
            expect ( new Card ( "Card 1: 1 | 1").getRating()).to.be.equal (1);
        });

        it ( "should rate to 8", () => {
            expect ( new Card ( "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53").getRating()).to.be.equal(8);
        });     
    });
});