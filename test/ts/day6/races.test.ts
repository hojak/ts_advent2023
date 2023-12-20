import { expect } from "chai";
import { describe } from "mocha";
import { Races } from "../../../src/ts/day6/races";

describe ( "Day 6: Races", () => {
    let testee = new Races ( 
        "Time:      7  15   30\n"+
        "Distance:  9  40  200"
    );

    it ( "should be 4 for the first race", () => {
        expect( testee.getWinningPossibilitiesOfRace(0)).to.be.equal(4);
    });
    it ( "should be 8 for the 2nd race", () => {
        expect( testee.getWinningPossibilitiesOfRace(1)).to.be.equal(8);
    });
    it ( "should be 9 for the 3rd race", () => {
        expect( testee.getWinningPossibilitiesOfRace(2)).to.be.equal(9);
    });

    it ( "should return the correct total value", () => {
        expect(testee.getRating()).to.be.equal(288);
    })

})