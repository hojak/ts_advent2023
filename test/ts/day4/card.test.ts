import { expect } from "chai";
import { Card } from "../../../src/ts/day4/card";

describe ( "day 4", () => {
  describe ( "Card", () => {
        describe ("Constructor", () => {
            it ( "should create a card", () => {
                expect (new Card ("Card 1: 1 | 2")).not.to.be.null;
            })
        })

        describe ("rate card", () => {
            it ( "an empty card rates 0", () => { 
                expect ( new Card ( "Card 1: | ").rate()).to.be.equal (0);
            });

            it ( "a simple match should rate to 1", () => { 
                expect ( new Card ( "Card 1: 1 | 1").rate()).to.be.equal (1);
            });
        })
    })
})