import { expect } from "chai";
import { describe } from "mocha";
import { WallOfBoxes } from "../../../src/ts/day15/wallOfBoxes"

describe ( "Day 15: WallOfBoxes", () => {

    describe ("evaluateInitialization", () => {
        it ( "should return 1 after 1st step", () => {
            expect ( new WallOfBoxes("rn=1").evaluateInitialization()).to.be.equal ( 1 );
        })

        it ( "should return 145 for the test input", () => {
            expect ( new WallOfBoxes("rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7").evaluateInitialization()).to.be.equal ( 145 );
        })
    })

});