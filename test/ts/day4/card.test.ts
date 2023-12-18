import { expect } from "chai";
import { Card } from "../../../src/ts/day4/card";

describe ( "day 4", () => {
  describe ( "Card", () => {
        describe ("Constructor", () => {
            it ( "should create a card", () => {
                expect (new Card ("Card 1: 1 | 2")).not.to.be.null;
            })
        })
    })
})