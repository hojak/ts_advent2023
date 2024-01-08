import { describe } from "mocha";
import { QuadraticFunction } from "../../../src/ts/day21/quadraticFunction";
import { expect } from "chai";

describe ( "Day 21: Quadratic Function", () => {
    describe ("create from points", () => {
        it ( "should create simple x²", () => {
            expect ( QuadraticFunction.createFromPoints(
                {x:1, y:1},
                {x:3, y:9},
                {x:5, y:25}
            )).to.be.deep.equal ( new QuadraticFunction(0,0,1));
        });
    })
});