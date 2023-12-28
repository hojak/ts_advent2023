import { expect } from "chai";
import { describe } from "mocha";
import { Box } from "../../../src/ts/day15/box";

describe ( "Day 15: Box", () => {

    describe ( "sumOfFocusingPower", () => {
        it ( "should return 0 for an empty box", () => {
            expect( new Box ().sumOfFocusingPower()).to.be.equal(0)
        })

        it ( "should return 5 after adding a  lens with 5 as focal length", () => {
            expect ( new Box().addLens ( "aa", 5).sumOfFocusingPower()).to.be.equal (5);
        })

    });

});

