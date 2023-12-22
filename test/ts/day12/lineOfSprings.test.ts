import { expect } from "chai";
import { describe } from "mocha";
import { LineOfSprings } from "../../../src/ts/day12/lineOfSprings";

describe ( "Day 12", () => {

    describe ("count possibilities", () => {
        it ( "should return 1", () => {
            expect ( new LineOfSprings ("? 1").getNumberOfPossibleSolutions()).to.be.equal(1);
        });

        it ( "should return 2", () => {
            expect ( new LineOfSprings ("?? 1").getNumberOfPossibleSolutions()).to.be.equal(1);
        });
    })

    describe ( "validate", () => {
        [
            "# 1",
            ".# 1",
            ".#. 1",
            ".## 2",
        ].forEach ( line => {
            it ( line + " should be valid", () => {
                expect ( LineOfSprings.isValidString ( line )).to.be.true;
            })
        });

        [
            "# 0",
            ".# 2",
            ".#. 2",
            ".## 1,1",
        ].forEach ( line => {
            it ( line + " should not be valid", () => {
                expect ( LineOfSprings.isValidString ( line )).to.be.false;
            })
        })

    })




});