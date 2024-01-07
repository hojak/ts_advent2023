import { describe } from "mocha";
import { expect } from "chai";
import { LinearFunction } from "../../../src/ts/day21/linearFunction";
import { QuadraticFunction } from "../../../src/ts/day21/quadraticFunction";

describe ( "Day 21: Linear Function", () => {
    describe ("create from points", () => {
        it ( "should create simple function", () => {
            expect ( LinearFunction.createFromPoints(
                {x:2, y:4},
                {x:6, y:8},
            )).to.be.deep.equal ( new LinearFunction(2,1));
        });
    });

    describe ( "get integral", () => {
        it ( "should give back 2*x²+10x", () => {
            expect(new LinearFunction(10,4).getIntegral())
                .to.be.deep.equal(new QuadraticFunction(0, 10, 2));
        } )
        
    })

});