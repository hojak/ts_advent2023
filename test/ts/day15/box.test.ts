import { expect } from "chai";
import { describe } from "mocha";
import { Box } from "../../../src/ts/day15/box";

describe ( "Day 15: Box", () => {

    describe ( "sumOfFocusingPower", () => {
        it ( "should return 0 for an empty box", () => {
            expect( new Box ().sumOfFocusingPower()).to.be.equal(0)
        })

        it ( "should return 5 after adding a lens with 5 as focal length", () => {
            expect ( new Box().addOrReplaceLens ( "aa", 5).sumOfFocusingPower()).to.be.equal (5);
        })

        it ( "should return 10 after adding two lenses", () => {
            expect ( new Box().addOrReplaceLens ( "aa", 4).addOrReplaceLens("bb", 3).sumOfFocusingPower()).to.be.equal(10);
        })

        it ( "should replace a lens with the same label", () => {
            expect (new Box().addOrReplaceLens("aa", 4).addOrReplaceLens("cc", 10).addOrReplaceLens("aa", 6).sumOfFocusingPower())
                .to.be.equal(26);
        })

    });

});

