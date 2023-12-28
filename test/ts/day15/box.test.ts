import { expect } from "chai";
import { describe } from "mocha";
import { Box } from "../../../src/ts/day15/box";

describe ( "Day 15: Box", () => {

    describe ( "sumOfFocusingPower", () => {
        it ( "shoult return 0 for an empty box", () => {
            expect( new Box ().sumOfFocusingPower()).to.be.equal(0)
        })
    });


});

