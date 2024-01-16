import { describe } from "mocha";
import { Coordinates } from "../../../src/ts/day22/coordinates";
import { expect } from "chai";

describe ("Day 22: Coordinates", () => {
    describe ( "largestCoordinateIsLargerThan", () => {
        it ( "should be longer", () => {
            expect ( new Coordinates(10,0,0).largestCoordinateIsLargerThan ( new Coordinates ( 3,0,0 ))).to.be.true;
            expect ( new Coordinates(10,0,0).largestCoordinateIsLargerThan ( new Coordinates ( 0,3,0 ))).to.be.true;
        });
    })
})