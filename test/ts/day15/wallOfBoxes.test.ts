import { expect } from "chai";
import { describe } from "mocha";
import { WallOfBoxes } from "../../../src/ts/day15/wallOfBoxes"

describe ( "Day 15: WallOfBoxes", () => {

    describe ("evaluateInitialization", () => {
        it ( "should return 1 after 1st step", () => {
            expect ( new WallOfBoxes("rn=1").evaluateInitialization()).to.be.equal ( 1 );
        })
    })

});