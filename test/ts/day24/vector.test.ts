import { expect } from "chai";
import { describe } from "mocha";
import { Vector } from "../../../src/ts/day24/vector";

describe ( "Day 24: vector", () => {
    describe ( "isParallelInXY", () => {
        it ( "should be true", () => {
            expect ( new Vector ( 1,2,10).isParallelInXY ( new Vector(-2, -4, 20))).to.be.true;
        });
        it ( "should be false", () => {
            expect ( new Vector ( 1,2,10).isParallelInXY ( new Vector(-2.1, -4, 20))).to.be.false;
        });
    });
});