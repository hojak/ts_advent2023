import { describe } from "mocha";
import { expect } from "chai";
import { LinearFunction } from "../../../src/ts/day21/linearFunction";

describe ( "Day 21: Linear Function", () => {
    describe ("create from points", () => {
        it ( "should create simple x²", () => {
            expect ( LinearFunction.createFromPoints(
                {x:2, y:4},
                {x:6, y:8},
            )).to.be.deep.equal ( new LinearFunction(2,1));
        });
    })
});